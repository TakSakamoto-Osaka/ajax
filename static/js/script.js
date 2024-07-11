const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfSafeMethod = (method) => {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

const updateFavorite = async () => {
    let csrftoken = getCookie('csrftoken');
           
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
            
    //  AJAX通信によりFavorite反転, 状態取得
    $.ajax({
        type: 'PUT',
        url: "http://127.0.0.1:8000/api/favorite/",
    }).done((data) => {
        //  画像イメージ更新
        let img_file = '/static/img/';
    
        if ( data['favorite'] == true ) {
            img_file += 'heart_on.png';
        } else {
            img_file += 'heart_off.png';
        }
        
        document.getElementById('img_favo').src = img_file; 
    }).fail((error) => {
        alert('error!!!');
    });
}
