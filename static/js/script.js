const updateFavorite = async () => {
    //  AJAX通信によりFavorite反転, 状態取得
    let json_val = await fetch("http://127.0.0.1:8000/api/favorite")
        .then((response)=> {
            return ( response.json() );
        })
        .catch((error)=>{
            console.log("通信失敗");
        });

    //  画像イメージ更新
    let img_file = '/static/img/';

    if ( json_val['favorite'] == true ) {
        img_file += 'heart_on.png';
    } else {
        img_file += 'heart_off.png';
    }

    document.getElementById('img_favo').src = img_file; 
}
