const postContainer = document.getElementById('post-container');
const latestPost = document.getElementById('latest-post');

// all post
const loadAllPost = async() => {
    postContainer.textContent = '';

    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    const allPost = data.posts;

    allPost.forEach((post) => {
        // console.log(post);    
        let activeStatus ='';

        if(post.isActive){
            activeStatus = `bg-green-600`;
        }
        else{
            activeStatus = `bg-red-600`;
        }

        const div = document.createElement('div');
        div.classList = `p-4 lg:p-6 bg-[#797DFC1A] flex flex-col lg:flex-row gap-2 lg:gap-5 rounded-lg`;
        div.innerHTML = `
            <!-- img left-->
        <div class="relative w-10">
            <img class="rounded-xl h-10 w-10" src="${post.image}" alt="">
                <div class="absolute h-3 w-3 rounded-full ${activeStatus}  border-2 border-white -top-1 -right-1"></div>
        </div>
            <!-- info right-->
            <div class="space-y-4 w-full">
                <div class="flex justify-between lg:justify-normal gap-2 lg:gap-5">
                    <p>#${post.category}</p>
                    <p>Author: ${post.author.name}</p>
                </div>
                <h1 class="font-bold">${post.title}</h1>
                <p class="">${post.description}</p>

                <hr class="my-2 h-0.5 bg-gray-300">

                <div class="flex justify-between items-center">
                    <div class="flex gap-2 lg:gap-8">
                        <p><i class="fa-regular fa-message mr-2"></i><span>${post.comment_count}</span></p>
                        <p><i class="fa-regular fa-eye mr-2"></i><span>${post.view_count}</span></p>
                        <p><i class="fa-regular fa-clock mr-2"></i><span>${post.posted_time}</span></p>
                    </div>
                    <div onclick="titleView('${post.title}', '${post.view_count}')" class="h-8 w-8 rounded-full bg-green-600 text-center p-1 cursor-pointer">
                        <i class="fa-regular fa-envelope-open text-white"></i>
                    </div>
                </div>
            </div>
        `;
       
        postContainer.appendChild(div);  
    });
    
}
let count = 1;
const titleView = (a,b) =>{
    const titleViewDiv = document.getElementById('title-view');
    const div = document.createElement('div');
    div.classList = `flex justify-between bg-white px-3 py-2 rounded-xl`
    div.innerHTML = `<h4 class="font-bold">${a}</h4>
    <p class="flex items-center"><i class="fa-regular fa-eye mr-2"></i><span>${b}</span></p>`
    document.getElementById('mark-read').innerText = count++;

    titleViewDiv.appendChild(div);
}

// latest post

const loadLatestPost = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    data.forEach((newPost) => {
        // console.log(newPost);

        const div = document.createElement('div');
        div.classList = `border-2 p-4 lg:p-8 rounded-xl space-y-5`;
        div.innerHTML = `
        <img class="h-40 w-full rounded-lg" src="${newPost.cover_image}" alt="">
                    <p><i class="fa-regular fa-calendar-check mr-2"></i><span>${newPost.author?.posted_date || "No Publish Date"}</span></p>
                    <h4 class="font-bold">${newPost.title}</h4>
                    <p>${newPost.description}</p>

                    <div class="flex items-center gap-5">
                        <div><img class="h-10 w-10 rounded-full" src="${newPost.profile_image}" alt=""></div>
                        <div>
                            <h4 class="font-bold">${newPost.author.name}</h4>
                            <p>${newPost.author?.designation || "Unknown"}</p>
                        </div>
                    </div>
        `;
        latestPost.appendChild(div);

    })
}

const searchPost = async(searchText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await response.json();
    const categoryPost = data.posts;
    // console.log(categoryPost);
    postContainer.textContent = ''

    categoryPost.forEach((post) => {
        // console.log(post);    
        let activeStatus ='';

        if(post.isActive){
            activeStatus = `bg-green-600`;
        }
        else{
            activeStatus = `bg-red-600`;
        }

        const div = document.createElement('div');
        div.classList = `p-4 lg:p-6 bg-[#797DFC1A] flex flex-col lg:flex-row gap-2 lg:gap-5 rounded-lg`;
        div.innerHTML = `
            <!-- img left-->
        <div class="relative w-10">
            <img class="rounded-xl h-10 w-10" src="${post.image}" alt="">
                <div class="absolute h-3 w-3 rounded-full ${activeStatus}  border-2 border-white -top-1 -right-1"></div>
        </div>
            <!-- info right-->
            <div class="space-y-4 w-full">
                <div class="flex justify-between lg:justify-normal gap-2 lg:gap-5">
                    <p>#${post.category}</p>
                    <p>Author: ${post.author.name}</p>
                </div>
                <h1 class="font-bold">'${post.title}'</h1>
                <p class="">${post.description}</p>

                <hr class="my-2 h-0.5 bg-gray-300">

                <div class="flex justify-between items-center">
                    <div class="flex gap-2 lg:gap-8">
                        <p><i class="fa-regular fa-message mr-2"></i><span>${post.comment_count}</span></p>
                        <p><i class="fa-regular fa-eye mr-2"></i><span>${post.view_count}</span></p>
                        <p><i class="fa-regular fa-clock mr-2"></i><span>${post.posted_time}</span></p>
                    </div>
                    <div onclick="titleView('${post.title}', '${post.view_count}')" class="h-8 w-8 rounded-full bg-green-600 text-center p-1 cursor-pointer">
                        <i class="fa-regular fa-envelope-open text-white"></i>
                    </div>
                </div>
            </div>
        `;
       
        postContainer.appendChild(div);  
    });
}

const searchCategoryPost = () => {
    const discussionSection = document.getElementById('discuss-section');
    const searchValue = document.getElementById('Search-text').value;
    searchPost(searchValue);
    document.getElementById('Search-text').value = ""
    discussionSection.scrollIntoView({behavior: "smooth"});

    document.getElementById('toggle-spinner').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('toggle-spinner').classList.add('hidden');
    }, 2000)
}

loadLatestPost();

loadAllPost();
