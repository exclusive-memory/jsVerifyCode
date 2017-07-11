!(function(window, document) {
    function GVerify(options) { //����һ��ͼ����֤����󣬽���options����Ϊ����
        this.options = { //Ĭ��options����ֵ
            id: "",
            //����Id
            canvasId: "verifyCanvas",
            //canvas��ID
            width: "100",
            //Ĭ��canvas���
            height: "30",
            //Ĭ��canvas�߶�
            type: "blend",
            //ͼ����֤��Ĭ������blend:������ĸ������͡�number:�����֡�letter:����ĸ
            code: ""
        }
        if (Object.prototype.toString.call(options) == "[object Object]") { //�жϴ����������
            for (var i in options) { //���ݴ���Ĳ������޸�Ĭ�ϲ���ֵ
                this.options[i] = options[i];
            }
        } else { //���뵥���������id
            this.options.id = options;
        }
        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(","); //����
        this.options.letterArr = getAllLetter(); //������ĸ����
        this._init(); //��ʼ��
        this.refresh(); //������֤��
    }
    GVerify.prototype = {
        /**�汾��**/
        version: '1.0.0',
        /**��ʼ������**/
        _init: function() {
            var con = document.getElementById(this.options.id); //�����֤���DIV
            var canvas = document.getElementById(this.options.canvasId); //��û���  IE����֧��canvas����������excanvas.js��������ǻ��ǲ�֧��createelement()����ʽ
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth: "100"; //����п�Ⱦ�ʹ���Լ��ģ�û�о�Ĭ��100
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight: "30"; //����г��Ⱦ�ʹ���Լ��ģ�û�о�Ĭ��30
            //  canvas.id = this.options.canvasId;//Ϊ����IE����Щȥ��
            //  canvas.width = this.options.width;
            //  canvas.height = this.options.height;
            //  canvas.style.cursor = "pointer";
            //  canvas.innerHTML = "����������汾��֧��canvas";
            //  con.appendChild(canvas);
            var parent = this; //��this��ֵparent
            canvas.onclick = function() { //��֤�����л�ˢ��
                parent.refresh();
            }
        },
        /**������֤��**/
        refresh: function() {
            this.options.code = ""; //������֤��Ϊ""
            var canvas = document.getElementById(this.options.canvasId); //�����֤�뻭��
            if (canvas.getContext) { //
                var ctx = canvas.getContext('2d'); //��û滭����
            } else { //
                return;
            }
            ctx.textBaseline = "middle";
            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height); //���ƾ��� 
            /* x:�����������꣨����ԭ��Ϊcanvas�����Ͻǣ���Ȼȷ�е���˵��ԭʼԭ�㣬����д�����ε�ʱ����Ͷ��ˣ�������ʱ���ù�ϵ��
       y:�������������
       width:���γ���
       height:���θ߶�*/
            if (this.options.type == "blend") { //�ж���֤������ blend:������ĸ������͡�number:�����֡�letter:����ĸ
                var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if (this.options.type == "number") {
                var txtArr = this.options.numArr;
            } else {
                var txtArr = this.options.letterArr;
            }
            for (var i = 1; i <= 4; i++) {
                var txt = txtArr[randomNum(0, txtArr.length)]; //ȡ��һ���ַ�
                this.options.code += txt; //������֤��
                ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; //������������С
                ctx.fillStyle = randomColor(50, 160); //������ʽ �������������ɫ    
                ctx.shadowOffsetX = randomNum( - 3, 3); //��Ӱ�ĺ���λ����
                ctx.shadowOffsetY = randomNum( - 3, 3); //��Ӱ������λ����
                ctx.shadowBlur = randomNum( - 3, 3); //��Ӱ��ģ����Χ��ֵԽ��Խģ����
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; //��Ӱ����ɫ
                var x = this.options.width / 5 * i;
                var y = this.options.height / 2;
                var deg = randomNum( - 30, 30);
                /**������ת�ǶȺ�����ԭ��
         * 
         * ƽ��context.translate(x,y)
         *  x:����ԭ����x�᷽��ƽ��x
         *  y:����ԭ����y�᷽��ƽ��y
         * 
         * **/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180); //��תcontext.rotate(angle)
                ctx.fillText(txt, 0, 0); //context.fillText(text,x,y) 
                /**�ָ���ת�ǶȺ�����ԭ��**/
                ctx.rotate( - deg * Math.PI / 180);
                ctx.translate( - x, -y);
            }
            /**���Ƹ�����**/
            for (var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180); //�����ɫ
                ctx.beginPath(); //·�� context.beginPath()
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height)); //�����߶� context.moveTo(x,y) context.lineTo(x,y)
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /**���Ƹ��ŵ�**/
            for (var i = 0; i < this.options.width / 4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI); // Բ��context.arc(x, y, radius, starAngle,endAngle, anticlockwise)
                ctx.fill();
            }
        },
        /**��֤��֤��**/
        validate: function(code) {
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            //console.log(v_code);
            if (code == v_code) {
                return true;
            } else {
                this.refresh();
                return false;
            }
        }
    }
    /**������ĸ����**/
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    /**����һ�������**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**����һ�����ɫ**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    window.GVerify = GVerify; //����Ϊwindow����
})(window, document);