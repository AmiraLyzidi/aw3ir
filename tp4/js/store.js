var contactStore = (function () {
    let contactListString = localStorage.getItem("contactList");
    let contactList = contactListString ? JSON.parse(contactListString) : [];

    return {
        add: function (_name, _firstname, _date, _address, _email) {
            var contact = {
                name: _name,
                firstname: _firstname,
                date: _date,
                address: _address,
                email: _email
            };
            contactList.push(contact);
            localStorage.setItem("contactList", JSON.stringify(contactList));
        },
        getList: function () {
            return contactList;
        },
        reset: function () {
            localStorage.removeItem("contactList");
        }
    };
})();
