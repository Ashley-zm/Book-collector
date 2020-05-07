<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      label="Note"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'note11'
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Note"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
    <a-date-picker v-decorator="['date-picker']" />
    </a-form-item>
    <a-form-item
      label="Note"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'note22'
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Gender"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-select
        v-decorator="[
          'gender'
        ]"
        placeholder="Select a option and change input text above"
        @change="handleSelectChange"
      >
        <a-select-option value="male">
          male
        </a-select-option>
        <a-select-option value="female">
          female
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-button
        type="primary"
        html-type="submit"
      >
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange (value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
  },
};
</script>