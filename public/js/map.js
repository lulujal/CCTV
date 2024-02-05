async function initMap() {
    // inisiasi variabel area unnes dan center dari map
    const unnes = { lat: -7.0505452, lng: 110.3924254 }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: unnes,
    });

    let area = [{lng: 110.3897028, lat: -7.0480879},
        {lng: 110.3894307, lat: -7.0486949},
        {lng: 110.3894629, lat: -7.0494717},
        {lng: 110.3894629, lat: -7.0500676},
        {lng: 110.3899459, lat: -7.0504826},
        {lng: 110.3906329, lat: -7.0509082},
        {lng: 110.3906973, lat: -7.0512380},
        {lng: 110.3907187, lat: -7.0514615},
        {lng: 110.3910622, lat: -7.0524298},
        {lng: 110.3912339, lat: -7.0525362},
        {lng: 110.3914164, lat: -7.0525256},
        {lng: 110.3916311, lat: -7.0522808},
        {lng: 110.3919746, lat: -7.0521319},
        {lng: 110.3921034, lat: -7.0519829},
        {lng: 110.3923073, lat: -7.0521744},
        {lng: 110.3924147, lat: -7.0523340},
        {lng: 110.3928762, lat: -7.0521425},
        {lng: 110.3931767, lat: -7.0520680},
        {lng: 110.3934451, lat: -7.0515892},
        {lng: 110.3939388, lat: -7.0517488},
        {lng: 110.3944755, lat: -7.0519297},
        {lng: 110.3947331, lat: -7.0517062},
        {lng: 110.3947009, lat: -7.0508550},
        {lng: 110.3949371, lat: -7.0505890},
        {lng: 110.3951947, lat: -7.0504506},
        {lng: 110.3956777, lat: -7.0504719},
        {lng: 110.3958602, lat: -7.0503655},
        {lng: 110.3959138, lat: -7.0501314},
        {lng: 110.3961393, lat: -7.0502485},
        {lng: 110.3962466, lat: -7.0505677},
        {lng: 110.3970089, lat: -7.0505771},
        {lng: 110.3970841, lat: -7.0509496},
        {lng: 110.3978784, lat: -7.0510134},
        {lng: 110.3981789, lat: -7.0513007},
        {lng: 110.3987371, lat: -7.0518966},
        {lng: 110.3988981, lat: -7.0520030},
        {lng: 110.3988444, lat: -7.0523967},
        {lng: 110.3988551, lat: -7.0526946},
        {lng: 110.3990376, lat: -7.0530990},
        {lng: 110.3994133, lat: -7.0531522},
        {lng: 110.3996053, lat: -7.0534104},
        {lng: 110.4002493, lat: -7.0535594},
        {lng: 110.4013334, lat: -7.0530167},
        {lng: 110.4016769, lat: -7.0522187},
        {lng: 110.4019410, lat: -7.0522631},
        {lng: 110.4021664, lat: -7.0526568},
        {lng: 110.4032290, lat: -7.0531995},
        {lng: 110.4036261, lat: -7.0532740},
        {lng: 110.4038735, lat: -7.0533509},
        {lng: 110.4042538, lat: -7.0527118},
        {lng: 110.4046136, lat: -7.0519971},
        {lng: 110.4041521, lat: -7.0519758},
        {lng: 110.4037335, lat: -7.0518481},
        {lng: 110.4029821, lat: -7.0511139},
        {lng: 110.4022415, lat: -7.0505713},
        {lng: 110.4014150, lat: -7.0498796},
        {lng: 110.4010428, lat: -7.0494126},
        {lng: 110.4006993, lat: -7.0490242},
        {lng: 110.4001626, lat: -7.0484603},
        {lng: 110.4000606, lat: -7.0484177},
        {lng: 110.3998406, lat: -7.0487582},
        {lng: 110.3995240, lat: -7.0483804},
        {lng: 110.3987833, lat: -7.0481197},
        {lng: 110.3971591, lat: -7.0473781},
        {lng: 110.3965615, lat: -7.0474031},
        {lng: 110.3964166, lat: -7.0476266},
        {lng: 110.3961858, lat: -7.0475893},
        {lng: 110.3960409, lat: -7.0476372},
        {lng: 110.3960282, lat: -7.0477969},
        {lng: 110.3959121, lat: -7.0479298},
        {lng: 110.3951017, lat: -7.0480575},
        {lng: 110.3948548, lat: -7.0480569},
        {lng: 110.3945274, lat: -7.0480729},
        {lng: 110.3942000, lat: -7.0480622},
        {lng: 110.3940712, lat: -7.0480250},
        {lng: 110.3940390, lat: -7.0475302},
        {lng: 110.3941785, lat: -7.0472642},
        {lng: 110.3940014, lat: -7.0470567},
        {lng: 110.3938941, lat: -7.0464715},
        {lng: 110.3932501, lat: -7.0465725},
        {lng: 110.3929334, lat: -7.0465938},
        {lng: 110.3926865, lat: -7.0466311},
        {lng: 110.3926122, lat: -7.0467545},
        {lng: 110.3926122, lat: -7.0470099},
        {lng: 110.3926336, lat: -7.0474143},
        {lng: 110.3926283, lat: -7.0478612},
        {lng: 110.3925263, lat: -7.0481166},
        {lng: 110.3922842, lat: -7.0482244},
        {lng: 110.3919091, lat: -7.0482868},
        {lng: 110.3915687, lat: -7.0482850},
        {lng: 110.3912655, lat: -7.0481801},
        {lng: 110.3909328, lat: -7.0481695},
        {lng: 110.3903478, lat: -7.0481322},
        {lng: 110.3900365, lat: -7.0480524},
        {lng: 110.3898701, lat: -7.0479673},
        {lng: 110.3897758, lat: -7.0479384},
        {lng: 110.3897085, lat: -7.0480829},
        {lng: 110.3897028, lat: -7.0480879}
    ]

    let polygon = new google.maps.Polygon({
        paths: area,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.1,
    });
    // menampilkan area unnes
    polygon.setMap(map);

    // fetch data cctv dari database dengan API getCctvs
    const getCctvs = async () => {
        try {
            const response = await fetch('/cctv');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const cctvs = await getCctvs();
   
    // menampilkan cctv pada map
    let currentInfoWindow = null;
    for (let i = 0; i < cctvs.length; i++) {
    try {
        // menentukan icon cctv sesuai jenisnya
        let iconbase;
        if (cctvs[i].type==="street"){
            iconbase = "/img/street_icon_marker_cctv1.png"
        }
        else if(cctvs[i].type==="building"){
            iconbase = "/img/building_icon_marker_cctv.png"
        }
        
        // membuat marker cctv
        const marker = new google.maps.Marker({
            position: {lat: parseFloat(cctvs[i].lat), lng: parseFloat(cctvs[i].lng)},
            map: map,
            icon: iconbase,
        });

        // membuat fungsi info window untuk cctv
        function createCustomInfoWindow(content){
            return new google.maps.InfoWindow({
                content: content,
                maxWidth: 300,
            });
        }

        // membuat fungsi createbutton untuk info window
        function createButton(buttonText, buttonId, buttonClass) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", buttonClass);
            button.setAttribute("id", buttonId);
            button.innerHTML = buttonText;
            return button.outerHTML;
        
        }

        // content atau isi dari info window
        let content = `
        <div id="content">
        <div id="siteNotice">
        </div>
        <h1 id="firstHeading" class="firstHeading">${cctvs[i].nama}</h1>
        <div id="bodyContent">
        <p>${cctvs[i].content}</p>
        <p>pilih jenis cctv</p>
        ${
            cctvs[i].type === "street" ? createButton("CCTV NORMAL", "cctvnormal", "btn btn-primary"):
            cctvs[i].type === "street" ? createButton("CCTV THERMAL", "cctvthermal", "btn btn-primary"):
            cctvs[i].type === "street" ? createButton("CCVT HELM Recognition", "cctvhelm", "btn btn-primary"): 
            cctvs[i].type === "building" ? createButton("Denah Gedung", "denahButton", "btn btn-primary") :
            ""
        }
        </div>
        </div>
        `
        // membuat info window
        const tempInfoWindow = document.createElement("div");
        tempInfoWindow.innerHTML = content;
        const infoWindow = createCustomInfoWindow(tempInfoWindow);

        // handler cctv normal ketika di klik
        function cctvNormalClick(){
            console.log("cctv normal clicked");
            window.location.href = "/cctvnormal?url=" + encodeURIComponent(cctvs[i].url);
        }
        
        // handler cctv gedung ketika di klik
        function cctvGedungClick(){
            console.log("cctv gedung clicked");
            window.location.href = "/cctvgedung/" + (cctvs[i].id);
        }

        // menampilkan info window ketika marker cctv jalan di klik
        if(cctvs[i].type === "street"){
            marker.addListener("click", () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;

                // menambahkan event click pada button cctv normal
                infoWindow.addListener('domready', () => {
                // Now the content is part of the DOM and you can safely add the event listener
                const cctvNormalButton = document.getElementById("cctvnormal");
                if (cctvNormalButton) {
                    cctvNormalButton.addEventListener("click", cctvNormalClick);
                }
        });
            });
        }

        // menampilkan info window ketika marker cctv gedung di klik
        if(cctvs[i].type === "building"){
            marker.addListener("click", () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;

                // menambahkan event click pada button denah gedung
                infoWindow.addListener('domready', () => {
                    // Now the content is part of the DOM and you can safely add the event listener
                    const denahButton = document.getElementById("denahButton");
                    if (denahButton) {
                        denahButton.addEventListener("click", cctvGedungClick);
                    }
                })
            });
        }

        else{
            marker.addListener("click", () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infoWindow.open(map, marker);
                currentInfoWindow = infoWindow;
            })
        }

         // event listener untuk menutup infowindow
         google.maps.event.addListener(map, "click", function () {
            infoWindow.close();
          }); 
    }catch (error) {
        console.log(error);
    }
}
    document.addEventListener("DOMContentLoaded", initMap);
    
}

window.initMap=initMap;