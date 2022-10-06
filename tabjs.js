function input_split(input_string){
    return input_string.split("\n");
  }
  function click_link(){  
    var target = document.getElementsByTagName('a');
    for (var i=0; i < target.length; i++) {
      target[i].addEventListener('click', function() {
        if(!this.textContent.match("送信済み")){
          this.innerHTML+= "<span class='send'>(送信済み)</span>";
        }
      });
    };
  };
  request = document.getElementById("request");
  talkid="";
  let music_info=[];
   const appto = Vue.createApp({
    data() {
      return {
        currentTab: 'その他',
        tabs: ['アーティスト共通', '作詞作曲共通', 'その他'],
      }
    },
    computed: {
      currentTabComponent() {// ここでタブが切り替わる前に入力されていたら反映させるようにする
        switch(this.currentTab){
          case 'アーティスト共通':
            return 'sames_all';
          case '作詞作曲共通':
            return 'sames_comp';
          case 'その他':
            return 'others';
        }
      }
    }
  });
  
  appto.component('sames_all', {
    template: `<div id="forms">
          <div id="inputG">
            <!-- JASRAC の作品コード -->
            <p>JASRAC作品コード</p>
            <a class="links" href="https://www2.jasrac.or.jp/eJwid/" target="_blank" rel="noopener noreferrer">作品コードはこちら</a><br>
            <textarea wrap="off" v-model="jasrac_code">作品コード</textarea>
            <!-- 楽曲のタイトル -->
            <p>楽曲のタイトル</p>
            <textarea wrap="off" v-model="input_list[0]"></textarea>
            <!-- アーティスト名 --> 
            <p>アーティスト名</p>
            <textarea wrap="off" v-model="input_list[1]"></textarea>
            <!-- トークID -->
            <p>トークID</p>
            <input type="text" v-model="talkID">
          </div>
          <br>
          <button class="btn-rad" @click="make_URL">申請フォームのリンクを作成</button>
          <br>
        </div>`,
    data(){
      return{
        jasrac_code:'',
        input_list:[],
        talkID: talkid 
      }
    },
    methods: {
      make_URL(){
        if(this.jasrac_code.match("\n")&&this.input_list[0].match("\n")&&this.input_list[1].match("\n")){
          jasrac_code=input_split(this.jasrac_code);
          music_info[0]=input_split(this.input_list[0]);
          music_info[1]=input_split(this.input_list[1]);
          if(jasrac_code.length==music_info[0].length &&
          music_info[0].length==music_info[1].length){
            let title=music_info[0].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let artist=music_info[1].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            for(i=0;i<jasrac_code.length;i++){
              link = document.createElement('li');
              link.innerHTML="<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+jasrac_code[i]+"&entry.33262962="+title[i]+"&entry.21388042="+artist[i]+"&entry.1162670487="+artist[i]+"&entry.732185066="+artist[i]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+title[i]+"</a>";
              request.appendChild(link);
              click_link();
            }; 
            this.jasrac_code='';
            this.input_list=[];
            talkid=this.talkID;
          }else{
            //もう少しわかりやすく表示
            alert("入力された情報数が異なります。ご確認ください。");
          }
        }else if(this.jasrac_code.match("\n")||this.input_list[0].match("\n")||this.input_list[1].match("\n")){
          alert("入力された情報数が異なります。ご確認ください。");
        }else{
          link = document.createElement('li');
          music_info=this.input_list.map(field=>{
            if(field.match(/'/i)){
              field=field.replace(/'/i ,'’');
            }
            return field;
          });
          link.innerHTML="<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+this.jasrac_code+"&entry.33262962="+music_info[0]+"&entry.21388042="+music_info[1]+"&entry.1162670487="+music_info[1]+"&entry.732185066="+music_info[1]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+music_info[0]+"</a>";
          request.appendChild(link);
          click_link();
          this.jasrac_code='';
          this.input_list=[];
          talkid=this.talkID;
        }
      }
    }
  });
  
  appto.component('sames_comp', {
    template: `<div id="forms">
          <div id="inputG">
            <!-- JASRAC の作品コード -->
            <p>JASRAC作品コード</p>
            <a class="links" href="https://www2.jasrac.or.jp/eJwid/" target="_blank" rel="noopener noreferrer">作品コードはこちら</a><br>
            <textarea wrap="off" v-model="jasrac_code"></textarea>
            <!-- 楽曲のタイトル -->
            <p>楽曲のタイトル</p>
            <textarea wrap="off" v-model="input_list[0]"></textarea>
            <!-- アーティスト名 --> 
            <p>アーティスト名</p>
            <textarea wrap="off" v-model="input_list[1]"></textarea>
            <!-- 作詞・作曲者 -->
            <p>作詞・作曲者</p>
            <textarea wrap="off" v-model="input_list[2]"></textarea>
            <!-- トークID -->
            <p>トークID</p>
            <input type="text" v-model="talkID">
          </div>
          <br>
          <button class="btn-rad" @click="make_URL">申請フォームのリンクを作成</button>
          <br> 
        </div> `,
    data(){
      return{
        jasrac_code:'',
        input_list:[],
        talkID: talkid 
        }
    },
    methods:{
      make_URL(){
        if(this.jasrac_code.match("\n")&&this.input_list[0].match("\n")&&this.input_list[1].match("\n")&&this.input_list[2].match("\n")){
          jasrac_code=input_split(this.jasrac_code);
          music_info[0]=input_split(this.input_list[0]);
          music_info[1]=input_split(this.input_list[1]);
          music_info[2]=input_split(this.input_list[2]);
          if(jasrac_code.length==music_info[0].length &&
          music_info[0].length==music_info[1].length &&
          music_info[1].length==music_info[2].length){
            let title=music_info[0].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let artist=music_info[1].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let author=music_info[2].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });  
            for(i=0;i<jasrac_code.length;i++){
              link = document.createElement('li');
              link.innerHTML="<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+jasrac_code[i]+"&entry.33262962="+title[i]+"&entry.21388042="+artist[i]+"&entry.1162670487="+author[i]+"&entry.732185066="+author[i]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+title[i]+"</a>";
              request.appendChild(link);
              click_link();
            }; 
            this.jasrac_code='';
            this.input_list=[];
            talkid=this.talkID;
          }else{
            alert("入力された情報数が異なります。ご確認ください。");
          }
        }else if(this.jasrac_code.match("\n")||this.input_list[0].match("\n")||this.input_list[1].match("\n")){
          alert("入力された情報数が異なります。ご確認ください。");
        }else{
          link = document.createElement('li');
          music_info=this.input_list.map(field=>{
            if(field.match(/'/i)){
              field=field.replace(/'/i ,'’');
            }
            return field;
          });
          link.innerHTML= "<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+this.jasrac_code+"&entry.33262962="+music_info[0]+"&entry.21388042="+music_info[1]+"&entry.1162670487="+music_info[2]+"&entry.732185066="+music_info[2]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+music_info[0]+"</a>";
          request.appendChild(link);
          click_link();
          this.jasrac_code='';
          this.input_list=[];
          talkid=this.talkID;
        }
      }
    }
  });
  
  appto.component('others', {
    template: `<div id="forms">
          <div id="inputG">
            <!-- JASRAC の作品コード -->
            <p>JASRAC作品コード</p>
            <a class="links" href="https://www2.jasrac.or.jp/eJwid/" target="_blank" rel="noopener noreferrer">作品コードはこちら</a><br>
            <textarea wrap="off" v-model="jasrac_code"></textarea>
            <!-- 楽曲のタイトル -->
            <p>楽曲のタイトル</p>
            <textarea wrap="off" v-model="input_list[0]"></textarea>
            <!-- アーティスト名 --> 
            <p>アーティスト名</p>
            <textarea wrap="off" v-model="input_list[1]"></textarea>
            <!-- 作詞者 -->
            <p>作詞者</p> 
            <textarea wrap="off" v-model="input_list[2]"></textarea>
            <!-- 作曲者 -->
            <p>作曲者</p> 
            <textarea wrap="off" v-model="input_list[3]"></textarea>
            <!-- トークID -->
            <p>トークID</p>
            <input type="text" v-model="talkID">
          </div>
          <br>
          <button class="btn-rad" @click="make_URL">申請フォームのリンクを作成</button>
          <br>
          
        </div> `,
    data(){
      return{
        jasrac_code:'',
        input_list:[],
        talkID: talkid
      }
    },
    methods: {
      make_URL(){
        if(this.jasrac_code.match("\n")&&this.input_list[0].match("\n")&&this.input_list[1].match("\n")&&this.input_list[2].match("\n")&&this.input_list[3].match("\n")){
          jasrac_code=input_split(this.jasrac_code);
          music_info[0]=input_split(this.input_list[0]);
          music_info[1]=input_split(this.input_list[1]);
          music_info[2]=input_split(this.input_list[2]);
          music_info[3]=input_split(this.input_list[3]);
          if(jasrac_code.length==music_info[0].length &&
          music_info[0].length==music_info[1].length &&
          music_info[1].length==music_info[2].length &&
          music_info[2].length==music_info[3].length){
            let title=music_info[0].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let artist=music_info[1].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let lyric=music_info[2].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });
            let composer=music_info[3].map(field=>{
              if(field.match(/'/i)){
                field=field.replace(/'/i ,'’');
              }
              return field;
            });       
            for(i=0;i<jasrac_code.length;i++){
              link = document.createElement('li');
              link.innerHTML="<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+jasrac_code[i]+"&entry.33262962="+title[i]+"&entry.21388042="+artist[i]+"&entry.1162670487="+lyric[i]+"&entry.732185066="+composer[i]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+title[i]+"</a>";
              request.appendChild(link);
              click_link();
            }; 
            this.jasrac_code='';
            this.input_list=[];
            talkid=this.talkID;
          }else{
            alert("入力された情報数が異なります。ご確認ください。");
          }
        }else if(this.jasrac_code.match("\n")||this.input_list[0].match("\n")||this.input_list[1].match("\n")||this.input_list[2].match("\n")||this.input_list[3].match("\n")){
          alert("入力された情報数が異なります。ご確認ください。");
        }else{
          link = document.createElement('li');
          music_info=this.input_list.map(field=>{
            if(field.match(/'/i)){
              field=field.replace(/'/i ,'’');
            }
            return field;
          });
          link.innerHTML= "<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLScIbQkMYB9Rp5HjuVgdVv2_2ePuKHGnVnrTgGN6DqRITTbQUg/viewform?usp=pp_url&entry.984133252="+this.jasrac_code+"&entry.33262962="+music_info[0]+"&entry.21388042="+music_info[1]+"&entry.1162670487="+music_info[2]+"&entry.732185066="+music_info[3]+"&entry.503422545="+this.talkID+"' target='_blank' rel='noopener noreferrer'>"+music_info[0]+"</a>";
          request.appendChild(link);
          click_link();
          this.jasrac_code='';
          this.input_list=[];
          talkid=this.talkID;
        }
      }
    }
  });
  
  appto.mount('#dynamic-tab');
  
  const accordion = Vue.createApp({
  });
  
  accordion.component('js-accordion', {
    template: `
    <div class="js-accordion" v-cloak>
      <button class="js-accordion--trigger" type="button" :class="{ '_state-open': isOpened }" @click="accordionToggle()">
        本サイトの使い方
      </button>
      <div class="js-accordion--target" :class="{ '_state-open': isOpened }" v-if="isOpened">
    <div class="js-accordion--body">
      <h2>フォームで入力する場合</h2>
        <p>
          <span>1.楽曲申請したいLIVEもしくはTalkのトークIDをコピーしておく</span>
          <br>
          <img src=".\/images\/1_result.jpeg" width="200" height="400">
          <img src=".\/images\/1_talkid.jpeg" width="200" height="400">
          <br>
          <span>2.タブから入力フォームを選択(アーティストが作詞作曲もしている場合は「アーティスト共通」、作詞作曲が同じ場合は「作詞・作曲共通」、それ以外の場合は「その他」を選択)</span>
          <br>
          <img src=".\/images\/2_tabselect.jpeg" width="200" height="400">
          <br>
          <span>3.J-widから作品を検索し、作品コードやアーティスト名など申請に必要な情報を入力(この時複数申請する際には、改行して値を入力(下記二つ目の画像参照))</span>
          <br>
          <img src=".\/images\/3_input_one.jpeg" width="200" height="400">
          <img src=".\/images\/3_input_dup.jpeg" width="200" height="400">
          <br>
          <span>4.「申請フォームのリンクを作成」で入力済みの申請フォームへのリンクができるのでそこから楽曲利用申請(本サイトはブラウザアプリでのご使用を推奨しております。)</span>
          <br>
          <img src=".\/images\/4_forms.gif" width="200" height="400">      
          <br>
        </p>
        <br>
        <h2>CSVファイルから入力する場合</h2>
        <p>
          <span>1.申請に必要な情報を入力してあるCSVファイルを用意(例となるファイルは<a href="https:/\/drive.google.com/uc?id=1Yy_eWthKBdoFLEPHRj4SmmsMwZO03NYb">こちら</a>をダウンロードして使用してください)</span>
          <br>
          <img src=".\/images\/1_csvinput.jpeg" width="200" height="400"> 
          <br>
          <span>2.「ファイルを選択」から指定のCSVファイルを選択すると入力済みの申請フォームへのリンクができるのでそこから楽曲利用申請(本サイトはブラウザアプリでのご使用を推奨しております。)</span>
          <br>
          <img src=".\/images\/2_csvinput.jpeg" width="200" height="400">
        </p>
        <br>
        <h2>使用するメリット</h2>
        <ul>
          <li>アーティストが作詞作曲している(または、作詞作曲が同じ)場合の入力の手間を省く</li>
          <li>複数の申請を一度に入力することができる</li>
          <li>トークIDを連続して使用することができる</li>
          <li>CSVファイルから申請フォームを作ることができる</li>
        </ul>
        <br>
        <h2>ご使用上の注意</h2>
        <ul>
          <li>本サイトは申請を自動化するものではございません。複数の申請フォームを作成後、別々で申請フォームでの送信が必須ですのでご理解の上ご使用ください。</li>
          <li>申請フォームへのリンクは別タブで開かれますので申請終了後はお手数ですがタブを閉じていただくようお願いします。</li>
          <li>本サイトを使用して期待する結果を得られない場合や、使用した結果として、直接的、間接的に発生した損害については、原因の如何を問わず、責任は負いかねますので何卒ご了承ください。</li>
          <li>Radiotalkは、Radiotalk株式会社で開発・運営されている音声配信プラットフォームです。本サイトは有志によって作成されたものであり、公式のサービスではありません。予めご了承ください。</li>
        </ul>
    </div>
      </div>
    </div>
    `,
    data() {
      return {
        isOpened: false
      };
    },
    methods: {
      accordionToggle: function(){
        this.isOpened = !this.isOpened;
      },
    }
  });
  
  accordion.mount('#accordion');
  