import express from 'express';
import AppController from '../controllers/AppController';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {express.Application} api - The Express application instance
 */
const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};

export default injectRoutes;
