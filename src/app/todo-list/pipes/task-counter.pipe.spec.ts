import { TaskCounterPipe } from './task-counter.pipe';

describe('Task Counter', () => {
  let pipe: TaskCounterPipe;

  beforeEach(() => {
    pipe = new TaskCounterPipe();
  });

  it('should format a string and number', () => {
    expect(pipe.transform('food', 4)).toBe('4. food');
  });

  it('should not format just a string', () => {
    expect(pipe.transform('food', 0)).toBe('');
  });
})
