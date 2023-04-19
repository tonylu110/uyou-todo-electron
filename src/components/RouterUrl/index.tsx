import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute()

    return () => (
      <div
        fixed top="50px" left="50%" translate="x-[-50%]"
        z-1000 bg-white p-x-20px p-y-10px shadow-item
        rounded-24
      >
        {route.fullPath} [name: {route.name}]
      </div>
    )
  }
})