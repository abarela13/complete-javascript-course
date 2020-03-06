export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);

        // Persist the data in local storage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);

        // Persist the data in local storage
        this.persistData();

        this.likes.splice(index, 1);
    }

    isLiked(id) {
        // IF anything other than -1 then it is present. TRUE
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem("likes"));

        // Restore from the localStorage
        if (storage) this.likes = storage;
    }
}