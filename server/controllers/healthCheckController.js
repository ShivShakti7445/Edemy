import mongoose from "mongoose";

export const checkDBConnection = (req, res) => {
    const state = mongoose.connection.readyState;
    let statusMessage = 'Unknown';
    let statusCode = 500;

    switch (state) {
        case 0:
            statusMessage = 'MongoDB is disconnected';
            statusCode = 500;
            break;
        case 1:
            statusMessage = 'MongoDB is connected';
            statusCode = 200;
            break;
        case 2:
            statusMessage = 'MongoDB is connecting';
            statusCode = 202;
            break;
        case 3:
            statusMessage = 'MongoDB is disconnecting';
            statusCode = 503;
            break;
    }
    res.status(statusCode).send(statusMessage);
};
