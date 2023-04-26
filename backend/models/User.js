class User{
    name;
    username;
    password;
    token;

    constructor(n, u, p, t){
        this.name = n;
        this.username = u;
        this.password = p;
        this.token = t;
    }

    static login(username, password){
        const index = db.findIndex(p => (p.username == username && p.password == password));
        if(index == -1){return false;}
        db[index].token = Date.now()+"_"+db[index].name;
        return db[index];
    }

    static logout(username){
        const index = db.findIndex(p => p.username == username);
        if(index == -1){return false;}
        db[index].token = undefined;
        return true;
    }

    static isRequestValid(token){
        if(token == undefined){return false;}
        //console.log({db})
        const index = db.findIndex(p => p.token == token);
        if(index == -1){return false;}
        return true;
    }

}

db = [
    new User('mohammed','user123','pass123'),
    new User('John','user456','pass456'),
    new User('Carlos','user789','pass789')
];


module.exports = User;