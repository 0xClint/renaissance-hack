import {
  DepthOfField,
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

const Effects = () => {
  const dofProps = {
    focusDistance: 0.01,
    focalLength: 0.2,
    bokehScale: 3,
  };

  return (
    <EffectComposer>
      <Bloom />
      <DepthOfField {...dofProps} />
    </EffectComposer>
  );
};

export default Effects;
