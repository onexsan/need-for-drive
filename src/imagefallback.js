export default {
  bind(el, binding) {
    try {
      const { value } = binding;
      const fallBackImage =
        'data:image/png;base64,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';
      const img = new Image();
      let error = fallBackImage;
      let original = el.src;
      if (typeof value === 'string') {
        error = value;
      }
      if (value instanceof Object) {
        error = value.fallBackImage || fallBackImage;
      }
      img.src = original;
      img.onload = () => {
        el.src = original;
      };
      img.onerror = () => {
        el.src = error;
      };
    } catch (e) {
      console.log(e);
    }
  },
};
