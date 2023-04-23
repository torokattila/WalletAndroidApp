import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const OtherPurchase: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M19.54 18.758c-.017-.567-.032-1.133-.009-1.7.02-.593.028-1.19.012-1.788a95.238 95.238 0 00-.063-1.829c-.027-.574-.02-1.148-.027-1.722-.004-.281-.027-.559-.031-.84-.004-.27-.008-.543-.035-.813-.051-.55-.028-1.113-.028-1.664.004-.636.04-1.277.047-1.914 0-.043-.015-.078-.023-.117a.623.623 0 00-.149-.625.672.672 0 00-.468-.184c-.16 0-.32.055-.426.184-.156.184-.324.36-.48.543-.188.223-.368.453-.551.68-.137.168-.27.336-.414.496-.07.074-.141.152-.211.23a2.189 2.189 0 01-.149-.238c-.047-.121-.086-.246-.133-.363a2.104 2.104 0 00-.27-.508c-.105-.14-.183-.313-.32-.422a1.01 1.01 0 00-.261-.152c0-.086-.004-.172-.004-.258a8.931 8.931 0 00-.078-.793c-.028-.203-.051-.41-.086-.61-.031-.195-.051-.394-.121-.578a3.701 3.701 0 00-.676-1.187 3.095 3.095 0 00-.645-.527c-.16-.102-.32-.207-.492-.29-.449-.226-.965-.269-1.46-.269h-.079a6.008 6.008 0 00-1.344.152c-.476.114-.89.387-1.226.739-.168.18-.332.363-.453.578a5.99 5.99 0 00-.375.761c-.102.254-.168.52-.211.79-.047.308-.094.613-.117.921-.024.293-.032.582-.04.875-.167.176-.32.368-.468.555a6.912 6.912 0 01-.477.54c0-.005-.004-.009-.008-.013-.132-.14-.273-.265-.414-.394-.375-.332-.726-.684-1.082-1.035a.615.615 0 00-1.047.43.625.625 0 00-.05.242c0 .332.007.664.007 1 0 .293-.011.582-.02.875-.015.578-.038 1.152-.046 1.73-.012 1.113.05 2.219.05 3.332 0 .582.009 1.164.005 1.746-.004.563.004 1.121-.012 1.68-.016.566-.039 1.133-.043 1.695-.008.57-.012 1.137-.031 1.707l-.024 1.11a.936.936 0 00-.043.332c.008.355.29.652.649.652.14 0 .262-.055.363-.129.313.02.621.04.93.04.316-.005.629-.02.941-.036.606-.023 1.207-.012 1.809-.004 1.226.012 2.453-.012 3.68-.016.976-.003 1.953 0 2.93-.023.444-.008.89-.027 1.335-.031.48 0 .965.012 1.445.02a.578.578 0 00.282-.071c.25.04.527-.07.648-.3.133-.25.086-.563.086-.837.004-.222.008-.445.016-.668.015-.562 0-1.125-.016-1.687zM9.43 5.254c.054-.414.117-.828.27-1.219.081-.183.179-.367.296-.535.137-.168.293-.32.461-.465.031-.02.063-.035.094-.05.199-.075.402-.122.61-.153.234-.027.468-.027.702-.023.227.003.453.011.676.03.086.016.164.036.246.063.106.051.207.11.305.172.12.078.242.149.355.227.102.086.192.176.274.277.125.176.234.375.324.574.078.211.11.442.156.664.04.207.074.414.102.625.043.372.039.75.058 1.125-.203.223-.394.457-.59.688-.058.07-.117.14-.175.215-.106-.117-.223-.223-.324-.348-.063-.078-.125-.156-.188-.238-.082-.113-.152-.23-.227-.348-.039-.058-.066-.12-.101-.18-.059-.101-.137-.195-.211-.289a.745.745 0 00-.598-.27.832.832 0 00-.59.282c-.105.117-.19.242-.28.367-.13.16-.266.313-.403.465-.113.125-.223.254-.336.383-.012-.02-.027-.035-.04-.055a15.31 15.31 0 00-.636-.777c-.09-.102-.164-.207-.254-.309-.004-.007-.011-.011-.02-.015-.003-.094-.007-.184-.003-.278 0-.203.02-.406.047-.605zm7.363 15.824c-.563.016-1.129.055-1.695.074-.598.024-1.192.028-1.79.032-.593.003-1.19.03-1.785.027-1.03-.012-2.058-.008-3.09-.023-.484-.008-.968.027-1.453.046-.425.02-.855-.011-1.28-.043-.005-.386-.009-.773.007-1.16.02-.574.016-1.144.023-1.715.012-.562.043-1.12.047-1.683 0-.555.004-1.113.008-1.672 0-.582-.004-1.164.004-1.746a40.13 40.13 0 00-.008-1.68c-.02-.55-.008-1.105-.015-1.656-.008-.586.015-1.168.023-1.75.004-.117.004-.23.008-.344l.144.149c.137.136.27.277.399.421.129.153.254.282.422.391.02.016.043.027.07.035.05.035.11.059.172.07.148.032.223.02.367-.003.152-.024.3-.153.41-.254.172-.164.324-.36.485-.535.187-.204.347-.434.523-.645l.274.344c.164.226.312.465.476.687.102.137.211.285.371.356a.659.659 0 00.344.094c.07.011.14.003.207-.02.176-.04.3-.148.434-.258.16-.133.293-.316.418-.484.187-.235.402-.445.59-.68.054.082.109.16.167.238-.004-.003-.008-.011-.011-.015l.035.047a.008.008 0 00-.008-.008c.023.031.05.062.074.094-.023-.028-.043-.055-.066-.086.11.148.21.304.336.445.097.11.191.223.285.336.05.074.09.152.144.223.09.125.192.265.34.328a.659.659 0 00.344.093c.07.008.137 0 .203-.023a.588.588 0 00.227-.098c.242-.16.375-.402.535-.632.172-.215.344-.43.52-.641.046-.055.09-.106.136-.156.07.218.129.441.246.64.059.102.13.196.2.29.093.124.19.245.304.355.035.031.066.07.102.097.113.086.218.18.363.215.16.035.308.043.469-.008.242-.078.441-.246.605-.433.25-.274.485-.559.715-.848 0 .184 0 .367-.004.547-.008.29-.004.574-.004.86 0 .273 0 .546.02.82.039.558.058 1.117.082 1.676.023.562.011 1.125.035 1.691.023.613.043 1.23.055 1.844.011.601-.004 1.203-.016 1.804-.008.567-.016 1.13-.016 1.692-.004.555.008 1.11-.023 1.664l-.024.539c-.488.008-.984.016-1.48.035zm.77-9.7c-.036.434-.063.868-.075 1.306-.015.527-.039 1.058-.043 1.59l-.011 1.624c0 .54-.004 1.075-.004 1.61 0 .277 0 .55-.004.828 0 .2-.004.398.008.598.082.3-.122.625-.418.707a.608.608 0 01-.453-.059c-.145-.086-.211-.207-.274-.355-.043-.106-.039-.239-.039-.352 0-.086.004-.172.004-.258.004-.187 0-.375 0-.562 0-1.078-.008-2.157-.016-3.235-.008-1.148-.015-2.297.051-3.441.02-.348.273-.637.637-.637.328 0 .66.29.637.637zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
