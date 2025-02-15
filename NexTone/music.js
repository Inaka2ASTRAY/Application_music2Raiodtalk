const read_csv={
    data(){
	    return{
        message: "",
        workers:[]
      }
    },
  methods: {
    loadCsvFile(e) {
      document.getElementsByTagName("table")[0].removeAttribute("hidden");
      this.workers = [];
      this.message = "";
      let file = e.target.files[0];

      if (!file.type.match("text/csv")) {
        this.message = "CSVファイルを選択してください";
        return;
      }

      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let lines = reader.result.split("\n");
        lines.shift();
        let linesArr = [];
        for (let i = 0; i < lines.length; i++) {
          linesArr[i] = lines[i].split(",");
          let ary=linesArr[i].map(field=>{
            if(field.match(/'/i)){
              field=field.replace(/'/i ,'’');
            }
            return field;
          });
          link = document.createElement('li');
          link.innerHTML="<a class='links gform' href='https://docs.google.com/forms/d/e/1FAIpQLSdKdWaigAEYx-VW1r4cKdDHreAYjz0ObiIpv0Z4fY4kspwG0g/viewform?usp=pp_url&entry.54165318="+ary[0]+"&entry.86599061="+ary[1]+"&entry.882127877="+ary[2]+"&entry.544664816="+ary[3]+"&entry.147907209="+ary[4]+"' target='_blank' rel='noopener noreferrer'>"+ary[1]+"</a>";
        request.appendChild(link);
        click_link();
        }
        this.workers = linesArr;
      };
    }
  }
};
const file = Vue.createApp(read_csv).mount("#files");

