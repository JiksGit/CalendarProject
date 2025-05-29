  // Geocode, Food APi start

    // 첫번째) json에서 placeword 해당하는 객체만 발췌
    function filterByDistrict(jsonData, placeword){
      return jsonData.DATA.filter(item => {
        return item.new_address.includes(placeword);
      });
    }

    function filterByWord(jsonData, word) {
        return jsonData.DATA.filter(item => { // jsonData에서 각각의 item을 filter로 받아옴
            const addr = item.new_address || "";
            const menu = item.fd_reprsnt_menu || "";
            return addr.includes(word) || menu.includes(word); // item에서 word가 포함될 경우 return
        });
    }

    // 두번째) 서울특별시 강남구 -> results 배열 안 geometry.location{latitude, longitude} 발췌 
    function geocodeDistrict(place, callback) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: `서울특별시 ${place}` }, function(results, status) {
        if (status === "OK") {
          const location = results[0].geometry.location;
          callback(location);
        } else {
          alert("Geocoding 실패: " + status);
        }
      });
    }
    // 세번째) filter된 각각의 json 객체들의 주소를 marker를 활용하여 map의 표현
    function showMarkersOnMap(locations, map) {
        const geocoder = new google.maps.Geocoder();
        locations.forEach(item => {
          geocoder.geocode({ address: item.new_address }, (results, status) => {
            if (status === "OK" && results[0]) {
              const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: item.post_sj, // 포인터 마우스 올렸을때 표시되는 부분
                icon: {
                  url: "/images/food-marker.png",
                  scaledSize: new google.maps.Size(25, 25)
                }
              });
              const infoWindow = new google.maps.InfoWindow({
                  content: `
                  <div style="min-width: 250px; font-size: 14px;">
                    <strong style="font-size: 15px; color: #333;">${item.post_sj}</strong><br/>
                    📍 ${item.new_address || "주소 없음"}<br/>
                    🕒 ${item.cmmn_use_time || "운영시간 정보 없음"}<br/>
                    ☎️ ${item.cmmn_telno || "전화번호 없음"}<br/>
                    🔗 <a href="${item.post_url}" target="_blank">상세보기</a>
                  </div>
                `,
                ariaLabel: item.post_sj
              });

              marker.addListener("click", () => {
                infoWindow.open(map, marker);
              });
            }
          });
        });
      }

 
    // Geocode, Food APi end
