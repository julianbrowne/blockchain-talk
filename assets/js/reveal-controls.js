Reveal.initialize({ 
	history: true,
	dependencies: [ 
		{ src: 'vendor/reveal/plugin/markdown/marked.js' },
		{ src: 'vendor/reveal/plugin/markdown/markdown.js' },
		{ src: 'vendor/external/external.js', 
			condition: function() { 
				return !!document.querySelector( '[data-external]' ); }
		},
		{ src: 'vendor/reveal/plugin/notes/notes.js', async: true },
		{ src: 'vendor/reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
	]
});

Reveal.addEventListener('hash', function() { 

	$("#digest-01").val(bcDemo.hash(""));

	$("#message-01").keyup(bcDemo.updateHashValueForTextInput);

	$("#digest-02").html(bcDemo.hash("alice"));

});

Reveal.addEventListener('links', function() { 

	var saveStateWidgetsSelector = ".bc-save-state-widget";

	$(saveStateWidgetsSelector).each (function() { 
		var element = $(this);
		element.data("state-manager", new bcDemo.StateManager(element));
	});

	$(saveStateWidgetsSelector).on("click", function() { 
		$(this).data("state-manager").toggleSaveState();
	});

	$("#clear-all").on("click", function() { 

		var allTextInputs = $(this).closest("section").find(".bc-mesg-text-input");

		allTextInputs.each(function() { 
			$(this).val("");
			bcDemo.updateHashValueForChainedTextInputs($(this));
			var allStateManagers = $(this)
				.closest("section")
				.find(".bc-save-state-widget");

			allStateManagers.each(function(index) { 
				$(this).data("state-manager").checkAndAlertStateChange();
			});
		});

	});

	$(".bc-mesg-text-input").keyup(function() { 

		bcDemo.updateHashValueForChainedTextInputs($(this));

		var allStateManagers = $(this)
			.closest("section")
			.find(".bc-save-state-widget");

		allStateManagers.each(function(index) { 
			$(this).data("state-manager").checkAndAlertStateChange();
		});

	});

});

Reveal.addEventListener('mining2', function() { 

	$("#bitcoin").hide();
	$("#minerfail").hide();

	function updateHashes() { 

		d1 = $("#data11").val();
		d2 = $("#data21").val();
		d3 = $("#data31").val();

		h1 = bcDemo.hash(d1);
		h2 = bcDemo.hash(h1.concat(d2));
		h3 = bcDemo.hash(h1.concat(h2).concat(d3));

		$("#hash11").val(h1);
		$("#hash21").val(h2);
		$("#hash31").val(h3);
	}

	updateHashes();

	$("#data11").keyup(updateHashes); 
	$("#data21").keyup(updateHashes);
	$("#data31").keyup(updateHashes);

	$("#start-mining").click(function() { 

		$("#bitcoin").hide();
		$("#minerfail").hide();

		var blockData = $("#hash31").val();
		var hashTarget = $('#hash-target').val().toString();

		var miner = new bcDemo.Miner(blockData, hashTarget);
		miner.mine();

	});

});