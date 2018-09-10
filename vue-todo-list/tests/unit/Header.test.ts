import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header', () => {
  const wrapper: any = mount(Header, {
    stubs: ['router-link']
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
