const fields = {
  name: {
    el: document.getElementById("name"),
    wrap: document.getElementById("field-name"),
    err: document.getElementById("err-name"),
    validate(v) { return v.trim().length >= 3; }
  },
  email: {
    el: document.getElementById("email"),
    wrap: document.getElementById("field-email"),
    err: document.getElementById("err-email"),
    validate(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
  },
  message: {
    el: document.getElementById("message"),
    wrap: document.getElementById("field-message"),
    err: document.getElementById("err-message"),
    validate(v) { const l = v.trim().length; return l >= 10 && l <= 500; }
  }
};

function validateField(key, show) {
  const f = fields[key];
  const ok = f.validate(f.el.value);
  if (show) {
    f.wrap.classList.toggle("invalid", !ok);
    f.wrap.classList.toggle("valid", ok);
  }
  return ok;
}

Object.keys(fields).forEach(function(k) {
  fields[k].el.addEventListener("blur", function() { validateField(k, true); });
  fields[k].el.addEventListener("input", function() {
    if (fields[k].wrap.classList.contains("invalid")) validateField(k, true);
  });
});

var msgEl = document.getElementById("message");
var charCount = document.getElementById("charCount");
if (msgEl && charCount) {
  msgEl.addEventListener("input", function() {
    charCount.textContent = msgEl.value.length;
  });
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  var results = Object.keys(fields).map(function(k) { return validateField(k, true); });
  if (results.every(Boolean)) {
    var successMsg = document.getElementById("successMsg");
    if (successMsg) successMsg.style.display = "block";
  } else {
    var firstInvalid = Object.keys(fields).find(function(k) {
      return !fields[k].validate(fields[k].el.value);
    });
    fields[firstInvalid].el.focus();
  }
});
