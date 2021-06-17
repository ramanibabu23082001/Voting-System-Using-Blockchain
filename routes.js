const routes = require('next-routes')();
routes
.add('/voter/voterdashboard','/voter/voterdashboard')
.add('/voter/registration','/voter/registration')
.add('/voter/verify/:address','/voter/verify/verification')
.add('/voter/result/:address','/voter/result/electionresult')
.add('/voter/:address','/voter/votingprocess')
.add('/admin/start','/admin/start')
.add('/admin/adminlogin','admin/adminlogin')
.add('/admin/dashboard','admin/dashboard')
.add('/admin/electioncreation','admin/electioncreation')
.add('/admin/electionlist','admin/electionlist')
.add('/admin/:address','admin/candidate')
.add('/admin/addelection','/admin/addelection');
module.exports = routes;