import express from 'express';
import connectDatabase from './config/db';
import Goal from "./models/Goal";
import cors from 'cors';


// Initialize express application
const server_port = 5000;
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({extended: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

// API endpoints

/**
 * @route GET api/goals
 * @desc Get goals
 */
app.get("/api/goals", async (req, res) => {
    try {
        const goals = await Goal.find().sort();
        res.json(goals);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route POST api/goals
 * @desc Get goals
 */
app.post("/api/goals", async (req, res) => {
    try {
        // create goal
        const goal = new Goal({
            goal: req.body.goal,
            genre: req.body.genre,
            created: new Date().toISOString(),
            completed: ``
        });

        // Save to db and return
        await goal.save();

        res.json(goal);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route PUT api/goals/:id
 * @desc Update a completed goal
 */
app.put("/api/goals/:id", async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        // Make sure the post was found
        if(!goal) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Update the post and return 
        goal.completed = req.body.goal.completed;
        await goal.save();

        res.json(goal);
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

/**
 * @route DELETE api/goals/:id
 * @desc Delete a goal
 */
app.delete("/api/goals/:id", async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        
        // Make sure the post was found
        if(!goal) {
            return res.status(404).json({ msg: 'Goal not found' });
        }

        await goal.remove();

        res.json({ msg: 'Goal removed' });
    } catch(error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Connection listener
app.listen(server_port, () => console.log(`Express server running on port ${server_port}`));