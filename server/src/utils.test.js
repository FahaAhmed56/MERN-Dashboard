import test from 'node:test';import assert from 'node:assert/strict';import {formatStatus,counts} from './utils.js';
test('formats kanban status',()=>assert.equal(formatStatus('in_progress'),'In Progress'));
test('counts tasks by status',()=>assert.deepEqual(counts([{status:'todo'},{status:'done'},{status:'todo'}]),{todo:2,in_progress:0,done:1}));
