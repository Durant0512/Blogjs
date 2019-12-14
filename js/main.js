const managerApi = {
    apiKey: 'd36511ff0d5a5ca2cef317b6389a2038',

    //Get list posts Method GET
    getPosts(limit=10, page=1) {
        const params = `limit=${limit}&&page=${page}&&api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            })
    },

    // Create post Method POST
    sendPost(post) {
        const params = `api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        const request = {
            method: 'POST',
            body: JSON.stringify(post)
        }

        return fetch(url, request)
            .then((response) => {
                return response.json();
            });
    },
}

const managerView = {
    title: document.querySelector('#title'),
    seoUrl: document.querySelector('#seo-url'),
    shortDescription: document.querySelector('#short-description'),
    fullDescription: document.querySelector('#full-description'),
    status: document.querySelector('#status'),
    btnSend: document.querySelector('#send-post'),
    postList: document.querySelector('#post-list'),

    addPost(){
        console.log('POST SENT')
        managerApi.sendPost({
            title: this.title.value,
            seo_url: this.seoUrl.value,
            status: this.status.checked,
            full_description: this.fullDescription.value,
            short_description: this.shortDescription.value,
        }).then(() => {
            managerApi.getPosts(50, 1)
            .then((data) => this.renderPosts(data.posts));
        })
    },

    renderPosts(posts){
        let html = '';
            for(let post of data.posts) {
                html += `
                <tr>
                    <td>${post.title}</td>
                    <td>${post.status}</td>
                    <td>${post.short_description}</td>
                    <td>${post.full_description}</td>
                </tr>
                `
            }
            this.postList.innerHTML = html;

    },
    
    init(){
        this.btnSend.onclick = this.addPost.bind(this);

        managerApi.getPosts(50, 1)
        .then((data) => this.renderPosts(data.posts));
    }
}

managerView.init();


/*managerApi.addPost({
    title: 'post-1-title',
    seo_url: 'post-1-title',
    full_description: 'post-1-full-description 555555555555555555555555 5555555555555',
    titshort_description: 'post-1-short-description',
    status: true,

})*/

//managerApi.getPosts().then((data)=>console.log(data))

/*managerApi.getPosts().then((data)=> {
    console.log(data);
});*/






/*const mangerApi = {
    apiKey: 'd36511ff0d5a5ca2cef317b6389a2038',

    getPosts(limit=10, page=1) {
        const params = `limit=${limit}&&page=${page}&&api_key=${this.apiKey}`;

        return fetch(`http://blog.api.axenov-it.com/v1/posts?${params}`)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data);
        })    
    },
}


mangerApi.getPosts();*/