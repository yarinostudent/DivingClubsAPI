class ClubClass {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name;
        this.phone = _item.phone;
        this.logo_url = _item.logo_url;
        this.org = _item.org;
        this.location = _item.location;
    }

    render() {
        let newDiv = $("<div class='clubBox'</div>")
        $(this.parent).append(newDiv);
        $(newDiv).append(`
        <h2>${this.name}</h2>
        <img src='${this.logo_url}' class='logo float-start'>
        <div>Phone: ${this.phone}</div>
        <div>Organization: ${this.org}</div>
        <div>Address: ${this.location}</div>
        `);
    }
}