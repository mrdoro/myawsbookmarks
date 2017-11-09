function awsAccountViewModel(bookmark) {
    this.account_name = ko.observable(bookmark.account_name)
    this.account_label = ko.observable(bookmark.account_label)
    this.account_role = ko.observable(bookmark.account_role)
    this.url = ko.computed(function () {
        return 'https://' + this.account_name() + '.signin.aws.amazon.com/console';
    }, this)

    this.removeBookmark = function () {
        bookmarkList.remove(this)
        var list = JSON.parse(localStorage.bookmarkList)
        list = $.grep(list, function (item) {
            return item.account_name != bookmark.account_name
        })
        localStorage.bookmarkList = JSON.stringify(list)
    }
}

function awsAccountViewModelRole(bookmark) {
    this.account_name = ko.observable(bookmark.account_name)
    this.account_label = ko.observable(bookmark.account_label)
    this.account_role = ko.observable(bookmark.account_role)
    this.url2 = ko.computed(function () {
        return 'https://signin.aws.amazon.com/switchrole?roleName=' + this.account_role() + '&account=' + this.account_name();
    }, this)

    this.removeBookmarkRole = function () {
        bookmarkList2.remove(this)
        var list = JSON.parse(localStorage.bookmarkList2)
        list = $.grep(list, function (item) {
            return item.account_name != bookmark.account_name
        })
        localStorage.bookmarkList2 = JSON.stringify(list)
    }
}

var bookmarkList = ko.observableArray();
ko.applyBindings(bookmarkList);

var bookmarkList2 = ko.observableArray();
//ko.applyBindings(bookmarkList2)

function local_storage_sync() {
    if (localStorage.bookmarkList) {
        var list = JSON.parse(localStorage.bookmarkList)
        $.each(list, function () {
            bookmarkList.push(new awsAccountViewModel(this))
        })
    }
    if (localStorage.bookmarkList2) {
      var list = JSON.parse(localStorage.bookmarkList2)
      $.each(list, function (){
          bookmarkList2.push(new awsAccountViewModelRole(this))
      })
    }
}


function navigate_aws_account() {
    var account_id = $('#account-id').val();
    if (account_id == '' || account_id == null) {
        return;
        alert('Fill the account name');
    }
    var url = "https://" + account_id + ".signin.aws.amazon.com/console";
    var win = window.open(url, '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Broswer has blocked it
        alert('Please allow popups for this site');
    }
}

function add_bookmark() {
    var account_id = $('#account-id').val();
    var account_label = $("#account-label").val();
    if (account_id == '' || account_id == null) {
        alert('Account Id cant be blank');
        return;
    }

    // Keep "account_name" as id for backwards compat
    var bookmark = {
        account_name: account_id,
        account_label: account_label
    }

    // Save to local storage
    var list = []
    if (localStorage.bookmarkList) {
        list = JSON.parse(localStorage.bookmarkList)
    }
    list.push(bookmark)
    localStorage.bookmarkList = JSON.stringify(list)

    // Clear form
    $("#account-id").val("")
    $("#account-label").val("")

    // Display
    bookmarkList.push(new awsAccountViewModel(bookmark))
}

function navigate_aws_account_role() {
    var account_id = $('#account-idr').val();
    var account_role = $('#account-role-namer').val();
    if (account_id == '' || account_id == null) {
        alert ('Fille the data');
        return;
    }
    var url = "https://signin.aws.amazon.com/switchrole?roleName=" + account_role + "&account=" + account_id;
    alert('URL copied to the Clipboard \n' + url);
    new Clipboard('.btn', {
      text: function(trigger) {
          return url;
      }
    });

    $("#account-idr").val("");
    $("#account-role-namer").val("");

}

function add_bookmark_role() {
    var account_id = $('#account-idr').val();
    var account_role = $('#account-role-namer').val();
    var account_label = $("#account-labelr").val();
    if (account_id == '' || account_id == null) {
        alert('Fill the form'+ account_id);
        return;
    }





    // Keep "account_name" as id for backwards compat
    var bookmark = {
        account_name: account_id,
        account_label: account_label,
        account_role: account_role
    }

    // Save to local storage
    var list = []
    if (localStorage.bookmarkList2) {
        list = JSON.parse(localStorage.bookmarkList2)
    }
    list.push(bookmark)
    localStorage.bookmarkList2 = JSON.stringify(list)

    // Clear form
    $("#account-idr").val("");
    $("#account-labelr").val("");
    $("#account-role-namer").val("");

    // Display
    bookmarkList2.push(new awsAccountViewModelRole(bookmark))
}

$.fn.keypressof = function (which, fn) {
    $(this).keypress(function (ev) {
        if (ev.which == which || ev.keyCode == which) fn();
    })
}

$(document).ready(function () {
    local_storage_sync();
    $("[data-toggle=tooltip]").tooltip();

    $('#go-btn').click(function () {
        navigate_aws_account();
    });
    $('#go-btn_role').click(function () {
        navigate_aws_account_role();
    });

    $('#add-btn').click(function () {
        add_bookmark();
    });

    $('#add-btn_role').click(function () {
        add_bookmark_role();
    });
    var ENTER = 13
    $("#account-id").keypressof(ENTER, navigate_aws_account)
    $("#account-label").keypressof(ENTER, add_bookmark)
});
