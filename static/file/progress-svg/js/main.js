$(document).ready(function() {
		$(".Download").eq(0).ElasticProgress({
				buttonSize: 60,
				fontFamily: "Montserrat",
				colorBg: "#adeca8",
				colorFg: "#7cc576",
				onClick: function(event) {
						console.log("onClick");
						$(this).ElasticProgress("open");
				},
				onOpen: function(event) {
						console.log("onOpen");
						fakeLoading($(this));
				},
				onComplete: function(event) {
						console.log("onComplete");
				},
				onClose: function(event) {
						console.log("onClose");
				},
				onFail: function(event) {
						console.log("onFail");
						$(this).ElasticProgress("open");
				},
				onCancel: function(event) {
						console.log("onCancel");
						$(this).ElasticProgress("open");
				}
        });
        
        $(".Download").eq(1).ElasticProgress({
            buttonSize: 60,
            fontFamily: "Montserrat",
            colorBg: "#adeca8",
            colorFg: "#7cc576",
            highlightColor: "#7cc576",
            onClick: function(event) {
                    console.log("onClick");
                    $(this).ElasticProgress("open");
            },
            onOpen: function(event) {
                    console.log("onOpen");
                    fakeLoading($(this), 2, 0.5);
            },
            onFail: function(event) {
                    console.log("onFail");
                    $(this).ElasticProgress("close");
            },
    });

		function fakeLoading($obj, speed, failAt) {
				if (typeof speed == "undefined") speed = 2;
				if (typeof failAt == "undefined") failAt = -1;
				var v = 0;
				var l = function() {
						if (failAt > -1) {
								if (v >= failAt) {
										if (typeof $obj.jquery != "undefined") {
												$obj.ElasticProgress("fail");
										} else {
												$obj.fail();
										}
										return;
								}
						}
						v += Math.pow(Math.random(), 2) * 0.1 * speed;

						if (typeof $obj.jquery != "undefined") {
								$obj.ElasticProgress("setValue", v);
						} else {
								$obj.setValue(v);
						}
						if (v < 1) {
								TweenMax.delayedCall(0.05 + (Math.random() * 0.14), l)
						}
				};
				l();
		}
});
