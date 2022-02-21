import db from './db/db.js'
import app from './app.js';

const PORT = 3001;

app.get('/', (req, res) => res.send('Hello from homepage XD'));

async function connectionDB() {
    try {
        await db.authenticate();
        console.log('Connection has been successfully');
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
}
connectionDB();

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));