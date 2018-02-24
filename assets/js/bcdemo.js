
var bcDemo = (function() { 

	function hash(str) { 
		var message = str.toString();
		var digest = sha256(message);
		return digest.toString();
	};

	function Miner(blockData, targetHashPrefix) { 

		var miner = this;
		this.blockData = blockData;
		this.timer = null;
		this.mineAttempts = 0;
		this.maxAttempts = 300000;
		this.targetHashPrefix = targetHashPrefix;

		function updateDisplay(digest) { 
			$('#nonce').val(miner.mineAttempts);
			$('#seal1').val(digest);
		}

		this.mine = function() { 

			var digest = hash(this.blockData + miner.mineAttempts);

			if(digest.substr(0, 4) === this.targetHashPrefix) { 
				updateDisplay(digest);
				$("#bitcoin").show();
				clearTimeout(timer);
				return;
			}

			if(miner.mineAttempts > miner.maxAttempts) { 
				updateDisplay(digest);
				$("#minerfail").show();
				clearTimeout(timer);
				return;
			}

			miner.mineAttempts++;

			if(miner.mineAttempts % 100 == 0) { 
				updateDisplay(digest);
				timer = setTimeout(miner.mine, 1);
			}
			else { 
				miner.mine();
			}
		}

	};

	return { 
		hash: hash,
		Miner: Miner
	};

}());

