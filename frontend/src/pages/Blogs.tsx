import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';

export function Blogs() {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            title={'title'}
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolor facilis ullam fuga autem quisquam dolorem temporibus quis debitis illo. Quisquam quia quibusdam exercitationem, et sapiente inventore nam dolorum officia.
Ea aut officia atque libero unde autem ab praesentium necessitatibus, tempora enim magnam eaque maiores, reiciendis totam in dolor exercitationem! Perferendis labore libero illum adipisci nostrum tempora voluptatibus vel neque!"
            authorName={'user'}
            publishedDate={'20th March 2024'}
          />

          <BlogCard
            title={'title'}
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolor facilis ullam fuga autem quisquam dolorem temporibus quis debitis illo. Quisquam quia quibusdam exercitationem, et sapiente inventore nam dolorum officia.
Ea aut officia atque libero unde autem ab praesentium necessitatibus, tempora enim magnam eaque maiores, reiciendis totam in dolor exercitationem! Perferendis labore libero illum adipisci nostrum tempora voluptatibus vel neque!"
            authorName={'user'}
            publishedDate={'20th March 2024'}
          />

          <BlogCard
            title={'title'}
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. A dolor facilis ullam fuga autem quisquam dolorem temporibus quis debitis illo. Quisquam quia quibusdam exercitationem, et sapiente inventore nam dolorum officia.
Ea aut officia atque libero unde autem ab praesentium necessitatibus, tempora enim magnam eaque maiores, reiciendis totam in dolor exercitationem! Perferendis labore libero illum adipisci nostrum tempora voluptatibus vel neque!"
            authorName={'user'}
            publishedDate={'20th March 2024'}
          />
        </div>
      </div>
    </div>
  );
}
