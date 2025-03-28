import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

export const formOpts = formOptions({
  defaultValues: {
    source: "",
    text: "",
    target: "",
    numberOfVersions: 1,
  },
});

export const SuperForm = withForm({
  ...formOpts,

  render: ({ form }) => {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="text"
            validators={{
              onChange: ({ value }) => {
                if (value.length < 1) return "Shouldn't be empty";
                if (value.length > 400)
                  return "Shouldn't be more than 400 characters";
              },
            }}
            children={(field) => (
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                required
                placeholder="Paste text that you want to transcreate here"
              />
            )}
          />

          <form.Field
            name="target"
            validators={{
              onSubmit: ({ value }) => {
                if (!value) {
                  return "Please select a language";
                }
              },
            }}
            children={(field) => (
              <select
                value={field.state.value}
                required
                onChange={(e) => field.handleChange(e.target.value)}
              >
                <option key={123} value={"de"}>
                  <p slot="label">De</p>
                </option>
                <option key={122} value={"en"}>
                  <p slot="label">En</p>
                </option>
              </select>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div>
                <button type="submit" disabled={!canSubmit}>
                  <div>
                    <div />
                    {isSubmitting ? "Transcreating..." : "Transcreate"}
                  </div>
                </button>
              </div>
            )}
          />
        </form>
      </div>
    );
  },
});
