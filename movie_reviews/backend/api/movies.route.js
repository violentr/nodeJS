import express from 'express';
const router = express.Router();
router.route('/').get((req, res) => res.status(200).json({ message: 'Hello from Movies API' }));
export default router;