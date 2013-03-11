var serverUrl = "http://localhost:50123/";
// This will apply date picker plugin
$(".datepicker").datepicker();

function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
			      return decodeURIComponent(name[1]);
}

loadTask= function() {
	var taskId = get("taskName");

	$.ajax({ url: serverUrl + "task/" + taskId,
		dataType: "json"
	}).done(function(data) {
		var self = this;
		self.form = data.form;
		var content = $("#form");
		var title = $("#title");
		var span = $("<span>" + self.form.caption + "</span>");
		var fields = self.form.fields;
		var rows = $("<div class='row-fluid' />");
		rows.appendTo(content);
		$.each(fields, function(index, value) {
			if (value.type == "text") {
				var row = $("<div class='row' />");
				var controlGroup = $("<div class='control-group' />");

				var label = $("<label for='" + value.path + "' class='control-label'>" + value.caption + "</label>");
				var controls = $("<div class='controls' />");
				controls.appendTo(controlGroup);
				var element = $("<input id='" + value.path + "' type='text'>");
				label.appendTo(row);
				element.appendTo(controls);
				controls.appendTo(row);

				row.appendTo(rows);
			}
		});
		span.appendTo(title);

		$.ajax({ url: serverUrl + "processdata/" + get("processId"),
			dataType: "json" 
		}).done(function(processData) {
			$.each(fields, function(index, field) {
				var element = $("#" + field.path);
				element.val(processData[field.path]);
			});

		});
	});
}
