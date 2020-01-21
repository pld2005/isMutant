import { Router } from 'express';
import { DnaComponent } from '../components';

const router: Router = Router();

// router.get('/mutant', DnaComponent.mutant);

router.post('', DnaComponent.mutant);

// router.get('/:id', DnaComponent.findOne);

export default router;
