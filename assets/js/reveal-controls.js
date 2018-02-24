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
	$("#hash").val(bcDemo.hash(''));
	$("#data").keyup(function() { 
		var message = $("#data").val();
		var digest = bcDemo.hash(message);
		$("#hash").val(digest);
	});
});

Reveal.addEventListener('links', function() { 

	function updateHashes() { 
		d1 = $("#data1").val();
		d2 = $("#data2").val();
		d3 = $("#data3").val();

		h1 = bcDemo.hash(d1);
		h2 = bcDemo.hash(h1.concat(d2));
		h3 = bcDemo.hash(h1.concat(h2).concat(d3));

		$("#hash1").val(h1);
		$("#hash2").val(h2);
		$("#hash3").val(h3);
	}

	$("#data1").keyup(updateHashes);
	$("#data2").keyup(updateHashes);
	$("#data3").keyup(updateHashes);

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