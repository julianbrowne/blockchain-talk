
var bcDemo = (function() { 

	var displayDataGroup = $(".bc-group");
	var hashTextDisplayElementSelector = $(".bc-hash-text-display");

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
		this.maxAttempts = 500000;
		this.targetHashPrefix = targetHashPrefix;
		this.targetHashPrefixLength = targetHashPrefix.length

		function updateDisplay(digest) { 
			$('#nonce').html(miner.mineAttempts);
			$('#digest-24').html(digest);
		}

		this.mine = function() { 

			var digest = hash(this.blockData + miner.mineAttempts);

			if(digest.substr(0, miner.targetHashPrefixLength) === this.targetHashPrefix) { 
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

	function StateManager(element) { 

		var mgr = this;
		var openHtml = "<i class=\"fas fa-lock-open\"></i>";
		var closedHtml = "<i class=\"fas fa-lock\"></i>";

		this.element = element;
		this.locked = false;
		this.state = null;
		this.element.html(openHtml);

		this.toggleSaveState = function() { 
			if(mgr.locked) { 
				mgr.state = null;
				mgr.element.toggleClass("locked");
				mgr.element.html(openHtml);
				mgr.locked = false;
				mgr.element.closest(".bc-group").removeClass("mismatch-alert");
			}
			else { 
				mgr.state = mgr.element.prev().val();
				mgr.element.toggleClass("locked");
				mgr.element.html(closedHtml);
				mgr.locked = true;
			}
		};

		this.checkAndAlertStateChange = function() { 
			if(mgr.locked) { 
				if(mgr.state !== mgr.element.prev().val()) { 
					mgr.element.closest(".bc-group").addClass("mismatch-alert");
				}
				else { 
					mgr.element.closest(".bc-group").removeClass("mismatch-alert");
				}
			}
		};

	};

	function getPartnerMessageDisplayElement(digestElement) { 
		return digestElement
			.closest(".bc-group")
			.find(".bc-mesg-text-input")
			.first();
	};

	function getPartnerDigestDisplayElement(textElement) { 
		return textElement
			.closest(".bc-group")
			.find(".bc-hash-text-display")
			.first();
	};

	function getAllDigestDisplayElements(textElement) { 
		return textElement
			.closest("section")
			.find(".bc-hash-text-display");
	};

	function updateHashValueForTextInput(element, value) { 
		var element = (element == undefined) ? $(this) : element;
		var textInputElementValue = (value == undefined) ? element.val() : value;
		var digest = hash(textInputElementValue);
		var partnerHashTextDisplayElement = getPartnerDigestDisplayElement(element);
		partnerHashTextDisplayElement.val(digest);
	};

	function updateHashValueForChainedTextInputs(textElement) { 

		var textElement = textElement || $(this);
		var textInputElementValue = textElement.val();
		var allDigestDisplayElements = getAllDigestDisplayElements(textElement);
		var partnerDigestDisplayElement = getPartnerDigestDisplayElement(textElement);
		var indexOfThisDigestElement = allDigestDisplayElements.index(partnerDigestDisplayElement);

		if(indexOfThisDigestElement==0) { 
			updateHashValueForTextInput(textElement, textInputElementValue);
		}
		else { 
			var previousDigestElement = allDigestDisplayElements.get(indexOfThisDigestElement-1);
			var digestValueOfPreviousMessage = $(previousDigestElement).val();
			messageToHash = textInputElementValue + digestValueOfPreviousMessage;
			updateHashValueForTextInput(textElement, messageToHash);
		}

		var indexOfTargetDigestDisplayElement = allDigestDisplayElements.index(partnerDigestDisplayElement);
		implicatedDigestDisplayElements = allDigestDisplayElements.slice(indexOfTargetDigestDisplayElement+1);

		implicatedDigestDisplayElements.each(function(index) { 
			currentMessageValueOfThisElement = getPartnerMessageDisplayElement($(this)).val();
			var indexOfThisDigestElement = allDigestDisplayElements.index($(this));
			var previousDigestElement = allDigestDisplayElements.get(indexOfThisDigestElement-1);
			var digestValueOfPreviousMessage = $(previousDigestElement).val();
			messageToHash = currentMessageValueOfThisElement + digestValueOfPreviousMessage;
			updateHashValueForTextInput($(this), messageToHash);
		});

	};

	return { 
		hash: hash,
		Miner: Miner,
		StateManager: StateManager,
		updateHashValueForTextInput: updateHashValueForTextInput,
		updateHashValueForChainedTextInputs: updateHashValueForChainedTextInputs
	};

}());

