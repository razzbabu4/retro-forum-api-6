const postContainer = document.getElementById('post-container');


const loadAllPost = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    const allPost = data.posts;

    allPost.forEach((post) => {
        console.log(post);
        const div = document.createElement('div');
        div.classList = `p-4 lg:p-6 bg-[#797DFC1A] flex flex-col lg:flex-row gap-2 lg:gap-5 rounded-lg`;
        div.innerHTML = `
        <!-- img left-->
        <div class="relative">
            <img class="rounded-xl h-10 w-10" src="${post.image}" alt="">
                <div class="absolute h-3 w-3 rounded-full bg-red-600 border-2 border-white -top-1 -right-1"></div>
            </div>
            <!-- info right-->
            <div class="space-y-4 w-full">
                <div class="flex flex-col lg:flex-row gap-2 lg:gap-5">
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
                    <div class="h-8 w-8 rounded-full bg-green-600 text-center p-1">
                        <i class="fa-regular fa-envelope-open text-white"></i>
                    </div>
                </div>
            </div>
        `;
        postContainer.appendChild(div)

        
    });
}

loadAllPost();