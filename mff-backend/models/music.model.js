const data = require('../data/data.json');
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'data.json');

class MusicsRepository {
    set musics(musics) {
        this._musics = musics;
    }

    get musics() {
        return this._musics;
    }

    constructor() {
        this._musics = data.musics;
    }


    /**
     * Update data json file
     *
     * @returns {Promise<void>}
     */
    async update() {
        data.musics = this._musics;
        await fs.writeFile(dataPath, JSON.stringify(data));
    }
}



module.exports = {
    musicRepository: new MusicsRepository()
}