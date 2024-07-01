const agentCollection=require("./../collections/agents")
const policyCareerCollection=require("./../collections/policyCareer") //company
const policyCategoriesCollection=require("./../collections/policyCategory")
const userCollection=require("./../collections/users")
const userAccountCollection=require("./../collections/userAccounts")
const policyInfoCollection=require("./../collections/policyInfo")
const csv = require("csvtojson");
const {parentPort}=require('worker_threads')
const accountsCollection = require("../collections/userAccounts")
const connectToLocal=require('./../db')


async function processCSV(csvFilePath){
    const csvData = await csv().fromFile(csvFilePath);
    const uniqueAgents = new Set();
    const uniqueCompany = new Set();
    const policyCategory = new Set();

    csvData.forEach(i => {
        uniqueAgents.add(i.agent);
        uniqueCompany.add(i.company_name);
        policyCategory.add(i.category_name);
    });

    await Promise.all(Array.from(uniqueAgents).map(async (agentName) => {
        let agent = await agentCollection.findOne({ agentName });
        if (!agent) {
            await agentCollection.create({ agentName });
        }
    }));

    await Promise.all(Array.from(uniqueCompany).map(async (companyName) => {
        let company = await policyCareerCollection.findOne({ companyName });
        if (!company) {
            await policyCareerCollection.create({ companyName });
        }
    }));

    await Promise.all(Array.from(policyCategory).map(async (categoryName) => {
        let category = await policyCategoriesCollection.findOne({ categoryName });
        if (!category) {
            await policyCategoriesCollection.create({ categoryName });
        }
    }));

    await Promise.all(Array.from(csvData).map(async (user) => {
        let _user = await userCollection.findOne({ firstName: user.firstname });
        if (!_user) {
            let userParams = new userCollection({
                firstName: user.firstname,
                DOB: user.dob,
                address: user.address,
                phoneNumber: user.phone,
                state: user.state,
                zip: user.zip,
                email: user.email,
                gender: user.gender ? user.gender : "",
                userType: user.userType,
            });
            await userParams.save();
        }
    }));

    await Promise.all(Array.from(csvData).map(async (data) => {
        let userAccount = await userAccountCollection.findOne({ accountName: data.account_name });
        if (!userAccount) {
            await userAccountCollection.create({ accountName: data.account_name });
        }
    }));

    await Promise.all(Array.from(csvData).map(async (data) => {
        let user = await userCollection.findOne({ firstName: data.firstname });
        let agent = await agentCollection.findOne({ agentName: data.agent });
        let policyCareer = await policyCareerCollection.findOne({ companyName: data.company_name });
        let policyCategory = await policyCategoriesCollection.findOne({ categoryName: data.category_name });
        let userAccount = await userAccountCollection.findOne({ accountName: data.account_name });
        if (user) {
            let policyParam = new policyInfoCollection({
                policyNumber: data.policy_number,
                policyStartDate: data.policy_start_date,
                policyEndDate: data.policy_end_date,
                policyCategory: policyCategory._id,
                company: policyCareer._id,
                agentId: agent._id,
                userAccountId: userAccount._id,
                userId: user._id
            });
            await policyParam.save();
        }
    }));
}
connectToLocal().then(() => {
    parentPort.on('message', async (csvFilePath) => {
        try {
            await processCSV(csvFilePath);
            parentPort.postMessage('done');
        } catch (error) {
            parentPort.postMessage(`error: ${error.message}`);
        }
    });
}).catch(err => {
    parentPort.postMessage(`error: ${err.message}`);
});