import renderer from 'react-test-renderer';
import History from '../History';

it('renders correctly', () => {
  const tree = renderer
    .create(<History />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});