import express from 'express';
import connectDatabase from './config/db';
import Compile from "./models/Compile"
import cors from 'cors';
import fs from 'fs';
import { exec } from 'child_process'


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
   * @route GET /
   * @desc Test endpoint
 */
app.get("/", (req, res) => 
    res.send("http get request sent to root api endpoint")
);

app.post(`/compile`, (req, res) => {

    // get code and create compilation entry
    let code = req.body.code;
    let compile = new Compile({
        timestamp: new Date(),
        code: code
    });
    
    try {

        // save code compilation to mongodb
        compile.save();

        // save code to c file
        let stream = fs.createWriteStream("./compile.c");
        stream.write(code);
        // compile c code with clang (system installed)
        exec("clang.exe compile.c -v", (error, stdout, stderr) => {
            res.send(stderr);
            return;
        });

        
      } catch (error) {
        res.status(500).end();
        res.end("Error compiling");
      }
});

app.get("/download", (req, res) => {
    res.download(__dirname + "\\a.exe");
});

// Connection listener
app.listen(server_port, () => console.log(`Express server running on port ${server_port}`));