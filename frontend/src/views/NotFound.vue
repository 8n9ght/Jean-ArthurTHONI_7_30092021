<template>
   <div class="container">
        <div class="page__title">
            <h1 class="title">Oops la page que vous cherchez n'éxiste pas !</h1>
        </div>
        <h2 class="sub_title">Revenez parmi nous</h2>
        <img src="../assets/404.png" class="notfound">
    </div>
</template>

<style coped>
*:focus{
    outline: none;
}

.container{
    background: linear-gradient(45deg, rgba(6,0,107,1) 0%, rgba(9,120,121,1) 35%, rgba(0,212,255,1) 100%);
    height: 52.7rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.page__title{
    margin: 5rem 0 0;
    position: relative;
    z-index: 99;
}

.title{
    color: rgb(255, 255, 255);
    line-height: 30pt;
    font-size: 35pt;
}

.sub_title{
    margin: 1rem 0 0;
    color: #fff;
    position: relative;
    z-index: 99;
}

.notfound{
    position: absolute;
    z-index: 1;
    max-width: 100%;
    width: fit-content;

}

</style>