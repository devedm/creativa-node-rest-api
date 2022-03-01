const express = require('express');
const req = require('express/lib/request');

const router =  new express.Router();
const routerCtrl = new express.Router();

const HealthRouter = require('./src/components/health/health.router');

// router's controller
routerCtrl.use('/health', HealthRouter);

// context
router.use('/api/v1', routerCtrl);

module.exports = router;