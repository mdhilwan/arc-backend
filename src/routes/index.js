import express from 'express'
import { animalRoutes } from './animal'

function getRoutes() {
  const router = express.Router()
  router.use('/animal', animalRoutes())
  return router
}

export { getRoutes }
