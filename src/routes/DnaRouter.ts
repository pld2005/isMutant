import { Router } from 'express';
import { DnaComponent } from '../components';

const router: Router = Router();

// router.get('/mutant', DnaComponent.mutant);

router.post('/mutant', DnaComponent.mutant);
router.get('/stats', DnaComponent.stats);

// router.get('/:id', DnaComponent.findOne);

export default router;
