const URL_API_GIT = 'https://api.github.com/users/andresflorez0799';

const imgProfile = document.querySelectorAll('.avatar');
const spnName = document.querySelector('#spnName');
const spnFollowme = document.querySelector('#spnFollowme');
const description = document.querySelector('#description');
const reposList = document.querySelector('#reposList');

const LoadProfileGithub = () => {
    fetch(URL_API_GIT)
        .then((response) => response.json())
        .then((data) => {
            imgProfile.forEach(x => x.src = data.avatar_url);
            spnName.innerHTML = data.name;
            spnFollowme.innerHTML = `@${data.url.split('/').pop()}`;
            description.innerHTML = data.bio;

            return data;
        })
        .then((response) => {
            fetch(response.repos_url)
                .then((response) => response.json())
                .then((data) => {
                    if (data != undefined && data != null) {
                        data.forEach(x => {
                            if (!x.private) {
                                let item_li = document.createElement('li');
                                let item_a = document.createElement('a');

                                item_li.innerHTML = `${x.name}  `;
                                item_li.setAttribute('title', x.description);
                                item_li.classList = 'font-light';
                                item_a.href = x.html_url;
                                item_a.setAttribute('target', '_blank');
                                item_a.innerHTML = 'ir al repositorio';
                                item_a.classList = 'underline decoration-amber-900 text-amber-900 text-xs font-semibold';
                                item_li.appendChild(item_a);
                                reposList.appendChild(item_li);
                            }
                        });
                    }
                })
        });
};

LoadProfileGithub();


const content = document.getElementById('myVideos');

//https://tailwindcss.com/docs/font-size estilos de tailwind
//https://commentpicker.com/youtube-channel-id.php descifrar idchannel
//https://console.cloud.google.com/apis/library crear y activar el api de google
const key = 'AIzaSyCPt5Vij1k30vlUv9xlFg_ot9DELsyzcn4';
const idCanal = 'UCtSmcTs5_QUUowzKa-PcO2w';
const API = 'https://www.googleapis.com/youtube/v3/search?key=' + key + '&channelId=' + idCanal + '&part=snippet,id&order=date&maxResults=8';

fetch(API)
    .then(response => response.json())
    .then(response => {
        let nextPageToken = response.nextPageToken;
        let pageInfo = response.pageInfo;
        let videos = response.items.map(x => ({
            etag: x.etag,
            kind: x.id.kind,
            videoId: x.id.videoId,
            snippet: x.snippet
        }));

        let tarjetaVideoHtml = '';
        videos.forEach(x => {
            if (x.videoId != undefined){
                tarjetaVideoHtml +=
                `<div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${x.snippet.thumbnails.high.url}" alt="${x.snippet.description}" class="w-full" />
                    </div>
                    <div class="mt-4 flex justify-between">
                    <a href="https://www.youtube.com/watch?v=${x.videoId}" target="_blank">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${x.snippet.title}
                    </h3>
                    </a>                  
                    </div>
                </div>
                `;
            }      
        });
        content.innerHTML = tarjetaVideoHtml;

        console.log(videos);
    })
    .catch(err => console.error(err));