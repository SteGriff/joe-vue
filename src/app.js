var inputData = [
		{
			"name" : "geoff",
			"level" : 5,
			"dob" : "1998-04-01T12:15:00Z",
			"active":true,
			"qualifications" :
			[
				{"name" : "Fire Safety Lv 1", "earned" : "2016-05-05"},
				{"name" : "First Aid Lv 1", "earned" : "2016-07-21"}
			],
			"badges" :
			[
				"green badge",
				"shiny badge"
			]
		},
		{
			"name" : "sandra",
			"level" : 6,
			"dob" : "1995-02-22T15:00:00Z",
			"active":true,
			"qualifications" :
			[
				{"name" : "Fire Safety Lv 1", "earned" : "2015-05-05"},
				{"name" : "Fire Safety Lv 2", "earned" : "2016-05-05"},
				{"name" : "First Aid Lv 1", "earned" : "2015-07-15"},
				{"name" : "First Aid Lv 2", "earned" : "2016-07-21"}
			]
		},
		{
			"name" : "billy",
			"level" : 1,
			"dob" : "2017-09-25T10:15:00Z",
			"active":false
		}
	];

var app = new Vue({
  el: '#app',
  methods : {
	showHide : function(id)
	{
		var index = this.shownEditors.indexOf(id);
		if (index !== -1)
		{
			this.shownEditors.splice(index, 1);
		}
		else
		{
			this.shownEditors.push(id);
		}
	}
  },
  data: {
    data: inputData,
    shownEditors: []
  }
})