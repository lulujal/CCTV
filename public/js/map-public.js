import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
async function initMap() {
    // inisiasi variabel area unnes dan center dari map
    const unnes = { lat:  -7.049756, lng: 110.396445 }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: unnes,
        zoomControl: false, //disable default zoom control
    });

    // Menambahkan kontrol zoom slider
    const zoomControlDiv = document.createElement("div");
    zoomControlDiv.classList.add("zoom-control");

    const zoomLabel = document.createElement("label");
    zoomLabel.textContent = "Zoom Level: 16x";
    zoomLabel.classList.add("zoom-label");

    const zoomSlider = document.createElement("input");
    zoomSlider.type = "range";
    zoomSlider.min = "1";
    zoomSlider.max = "21";
    zoomSlider.value = "16";
    zoomSlider.classList.add("zoom-slider");

    zoomSlider.addEventListener("input", () => {
        const zoomLevel = parseInt(zoomSlider.value);
        map.setZoom(zoomLevel);
        zoomLabel.textContent = `Zoom Level: ${zoomLevel}x`;
    });

        // Event listener untuk memperbarui slider ketika zoom peta berubah
        map.addListener("zoom_changed", () => {
            const zoomLevel = map.getZoom();
            zoomSlider.value = zoomLevel;
            zoomLabel.textContent = `Zoom Level: ${zoomLevel}x`;
        });

    zoomControlDiv.appendChild(zoomLabel);
    zoomControlDiv.appendChild(zoomSlider);

    // Menambahkan kontrol zoom slider ke peta
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(zoomControlDiv);

    let area = [
        {lng: 110.3897028, lat: -7.0480879},
        {lng: 110.3894307, lat: -7.0486949},
        {lng: 110.3894629, lat: -7.0494717},
        {lng: 110.3894629, lat: -7.0500676},
        {lng: 110.3899459, lat: -7.0504826},
        {lng: 110.3905609, lat: -7.0508049},
        {lng: 110.3906231, lat: -7.0509801},
        {lng: 110.3906212, lat: -7.0512351},
        {lng: 110.3906385, lat: -7.0514444},
        {lng: 110.3906447, lat: -7.0517338},
        {lng: 110.3907174, lat: -7.0521066},
        {lng: 110.3910354, lat: -7.0524522},
        {lng: 110.3911246, lat: -7.0525770},
        {lng: 110.3911525, lat: -7.0526481},
        {lng: 110.3910314, lat: -7.0529170},
        {lng: 110.3908509, lat: -7.0531674},
        {lng: 110.3907838, lat: -7.0534267},
        {lng: 110.3909210, lat: -7.0536985},
        {lng: 110.3917732, lat: -7.0536679},
        {lng: 110.3920965, lat: -7.0535307},
        {lng: 110.3923935, lat: -7.0533421},
        {lng: 110.3925521, lat: -7.0529202},
        {lng: 110.3924919, lat: -7.0523212},
        {lng: 110.3926487, lat: -7.0521300},
        {lng: 110.3931767, lat: -7.0520680},
        {lng: 110.3934625, lat: -7.0514680},
        {lng: 110.3939396, lat: -7.0517278},
        {lng: 110.3940829, lat: -7.0517910},
        {lng: 110.3944643, lat: -7.0518149},
        {lng: 110.3946198, lat: -7.0518011},
        {lng: 110.3947459, lat: -7.0516433},
        {lng: 110.3947009, lat: -7.0508550},
        {lng: 110.3948288, lat: -7.0505781},
        {lng: 110.3949317, lat: -7.0504662},
        {lng: 110.3953330, lat: -7.0493320},
        {lng: 110.3956154, lat: -7.0494161},
        {lng: 110.3954051, lat: -7.0503978},
        {lng: 110.3955415, lat: -7.0504114},
        {lng: 110.3956742, lat: -7.0503874},
        {lng: 110.3958298, lat: -7.0503790},
        {lng: 110.3958072, lat: -7.0501141},
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
        {lng: 110.3990240, lat: -7.0530672},
        {lng: 110.3992262, lat: -7.0530959},
        {lng: 110.3993207, lat: -7.0531183},
        {lng: 110.3994146, lat: -7.0531327},
        {lng: 110.3994920, lat: -7.0531365},
        {lng: 110.3995054, lat: -7.0532654},
        {lng: 110.3995494, lat: -7.0534032},
        {lng: 110.3998342, lat: -7.0535247},
        {lng: 110.4002493, lat: -7.0535594},
        {lng: 110.4008009, lat: -7.0533154},
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
        {lng: 110.3970723, lat: -7.0473130},
        {lng: 110.3968756, lat: -7.0473498},
        {lng: 110.3965834, lat: -7.0474162},
        {lng: 110.3965011, lat: -7.0475231},
        {lng: 110.3964468, lat: -7.0476051},
        {lng: 110.3962099, lat: -7.0475699},
        {lng: 110.3960728, lat: -7.0476263},
        {lng: 110.3960599, lat: -7.0477979},
        {lng: 110.3960564, lat: -7.0479132},
        {lng: 110.3959796, lat: -7.0480148},
        {lng: 110.3958800, lat: -7.0482129},
        {lng: 110.3956780, lat: -7.0483191},
        {lng: 110.3952335, lat: -7.0483224},
        {lng: 110.3951512, lat: -7.0483095},
        {lng: 110.3951029, lat: -7.0483123},
        {lng: 110.3949435, lat: -7.0480419},
        {lng: 110.3949583, lat: -7.0480251},
        {lng: 110.3949361, lat: -7.0480043},
        {lng: 110.3949031, lat: -7.0479262},
        {lng: 110.3948290, lat: -7.0476512},
        {lng: 110.3947426, lat: -7.0473481},
        {lng: 110.3942834, lat: -7.0471648},
        {lng: 110.3940014, lat: -7.0470567},
        {lng: 110.3939221, lat: -7.0470157},
        {lng: 110.3938988, lat: -7.0467651},
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

    let testArea1 = [
        {lng: 110.3926437, lat: -7.0488739},
        {lng: 110.3926022, lat: -7.048961},
        {lng: 110.392633, lat: -7.0490854},
        {lng: 110.3926692, lat: -7.0491187},
        {lng: 110.3927088, lat: -7.0491407},
        {lng: 110.3927513, lat: -7.049145},
        {lng: 110.3928234, lat: -7.0491507},
        {lng: 110.3928663, lat: -7.0491327},
        {lng: 110.3929092, lat: -7.0490998},
        {lng: 110.3929508, lat: -7.0490575},
        {lng: 110.3929523, lat: -7.0490094},
        {lng: 110.3929511, lat: -7.04896},
        {lng: 110.3929461, lat: -7.0489065},
        {lng: 110.3929307, lat: -7.0488659},
        {lng: 110.3928415, lat: -7.0488374},
        {lng: 110.3927738, lat: -7.0488316},
        {lng: 110.3927188, lat: -7.0488413},
        {lng: 110.3926437, lat: -7.0488739}
        ]

    let testArea2= [
        {lng: 110.395365,lat: -7.0489399},
        {lng: 110.3953794,lat: -7.0489386},
        {lng: 110.3953685,lat: -7.0488324},
        {lng: 110.3953613,lat: -7.0487755},
        {lng: 110.3952156,lat: -7.0487917},
        {lng: 110.395245,lat: -7.0489602},
        {lng: 110.395365,lat: -7.0489399}
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

    let polygontest1= new google.maps.Polygon({
        paths: testArea1,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
    })

    let polygontest2= new google.maps.Polygon({
        paths: testArea2,
        strokeColor: "#00FF00",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.1,
    })

    polygontest1.setMap(map);
    polygontest2.setMap(map);

    // fetch data cctv dari database dengan API getCctvs
    const getCctvs = async () => {
        try {
            const response = await fetch('/cctv-public');
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    const cctvs = await getCctvs();
   
    // menampilkan cctv pada map
    let currentInfoWindow = null;
    const markers = []
    for (let i = 0; i < cctvs.length; i++) {
    try {
        // menentukan icon cctv sesuai jenisnya
        let iconbase;
        if (cctvs[i].type === "street"){
            iconbase = "/img/street_icon_marker_cctv1.png"
        }
        else if(cctvs[i].type === "building"){
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
            window.location.href = "/cctvpublicstream?url=" + encodeURIComponent(cctvs[i].url);
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

        markers.push(marker);
    }catch (error) {
        console.log(error);
    }
}
    new MarkerClusterer({
        map, 
        markers,
        algorithm: new SuperClusterAlgorithm({
            minClusterSize: 2,
            maxClusterRadius: 20,
            minClusterZoom: 0,
            maxClusterZoom: 21,
        }),
    });
    document.addEventListener("DOMContentLoaded", initMap);
    
}

window.initMap=initMap;