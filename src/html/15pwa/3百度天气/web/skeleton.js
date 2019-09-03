const Skeleton = {
    Render(key, type, row) {
	//示例 skeleton.Render(city, 'title', 3);
	//每次调用可以生成一个 model(div),它含有多个 row(p) 
	//
        let rows = (function() {//得到若干个 p 元素,即 rows
            let temp = '';
            for (let i = 0; i < row; i ++) {
                temp += '<p class="item"></p>'
            }
            return temp;
        })();

        let model = (function() {//
            let temp = '';
            switch (type) {
                case 'normal':
                    temp = `
                        <div class="card preload mg" id="${key}">
                            ${ rows }
                            <p class="item" style="width: 4rem"></p>
                        </div>
                    `
                    break;
                case 'title':
                    temp = `
                        <div class="card preload mg" id="${key}">
                            <p class="head"></p>
                            ${ rows }
                            <p class="item" style="width: 4rem"></p>
                        </div>
                    `
                    break;
                default:
                    break;
            }
            return document.createRange().createContextualFragment(temp);//将HTML字符转换为DOM节点(还没加入到DOM树)
        })();

        return model;
    }
}

export default Skeleton
