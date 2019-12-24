const managerApi = {
    apiKey: 'd36511ff0d5a5ca2cef317b6389a2038',

    getPosts(limit = 10, page = 1) {
        const params = `limit=${limit}&&page=${page}&&api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

       return fetch(url)
       .then((response)=>{
            return response.json();
       });
    },

    sendPosts(post) {
        const params = `api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts?${params}`;

        const request = {
            method: 'POST',
            body: JSON.stringify(post),
        }
       return fetch(url, request)
       .then((response)=>{
            return response.json();
       });
    },

    deletePosts(postId) {
        const params = `api_key=${this.apiKey}`;
        const url = `http://blog.api.axenov-it.com/v1/posts/${postId}?${params}`;

        const request = {
            method: 'DELETE',
        }
       return fetch(request)
       .then((response)=>{
            return response;
       });
    },

}

//managerApi.getPosts().then((data) => console.log(data))


const managerView = {
    title: document.querySelector('#title'),
    seoUrl: document.querySelector('#seo-url'),
    shortDescription: document.querySelector('#short-description'),
    fullDescription: document.querySelector('#full-description'),
    status: document.querySelector('#status'),
    btnSend: document.querySelector('#btn'),
    postList: document.querySelector('#posts-list'),
    

    addPost(){
        console.log('POST SENT')
        managerApi.sendPosts({
            title: this.title.value,
            seo_url: this.seoUrl.value,
            short_description: this.shortDescription.value,
            full_description: this.fullDescription.value,
            status: this.status.value,
        }).then(() => {
            managerApi.getPosts(50, 1)
            .then((data) => this.renderPosts(data.posts));
        });
    },

    renderPosts(posts){
       let html = `
        <tr class="tableposts__row">
            <th class="tableposts__cell">Title</th>
            <th class="tableposts__cell">Status</th>
            <th class="tableposts__cell">Description</th>
            <th class="tableposts__cell">Full description</th>
            <th class="tableposts__cell">Delete</th>
        </tr>
    `

            for(let post of posts){
                html += `
                    <tr class="tableposts__row">
                        <td class="tableposts__cell">${post.title}</td>
                        <td class="tableposts__cell">${post.status}</td>
                        <td class="tableposts__cell">${post.short_description}</td>
                        <td class="tableposts__cell">${post.full_description}</td>
                        <td id="delbtn" class="tableposts__cell"><button>Delete</button></td>
                    </tr>
                `
            }

            this.postList.innerHTML = html;
            
    },




    init(){
        this.btnSend.onclick = this.addPost.bind(this);

        managerApi.getPosts(50, 1)
        .then((data) => this.renderPosts(data.posts));
    },


   
}

managerView.init();




/*managerApi.addPosts({
    title: 'post 1 titile',
    seo_url: 'post-1-titile',
    full_description: 'blablablablablablablablablablablablablabla',
    short_description: 'blablabla blabla',
    status: true,

})*/







/*
managerApi.getPosts().then((data)=> {
    console.log(data);
})*/