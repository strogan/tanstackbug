import { formOpts, SuperForm, useAppForm } from "./form";

export default function Root(props: any) {
  const form = useAppForm({
    ...formOpts,
    onSubmitInvalid: () => {},
    onSubmit: async ({ value }) => {
      try {
        alert(value);
      } catch (error) {}
    },
  });

  return (
    <section>
      {props.name} is mounted! <SuperForm form={form} />
    </section>
  );
}
